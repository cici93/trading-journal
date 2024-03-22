using FluentResults;
using Microsoft.EntityFrameworkCore;
using TradingJournal.Constants;
using TradingJournal.Data;
using TradingJournal.Dtos;
using TradingJournal.Interfaces;
using TradingJournal.Models;

namespace TradingJournal.Services;

public class PositionService(DataContext data, Lazy<ITransactionService> transactionService) : IPositionService
{
    private readonly DataContext _data = data;
    private readonly Lazy<ITransactionService> _transactionService = transactionService;

    public async Task<Result<List<PositionDto>>> GetPositionsAsync()
    {
        try
        {
            var positions = await _data.Positions
                .Include(x => x.Transactions)
                .ToListAsync();

            return positions.Count == 0
                ? Result.Fail("No Positions available")
                : Result.Ok(positions.Select(MapToDto).ToList());
        }
        catch (Exception exc)
        {
            return Result.Fail(exc.Message);
        }
    }

    public async Task<Result<PositionDto>> GetPositionByIdAsync(int positionId)
    {
        try
        {
            var position = await _data.Positions
                .Include(x => x.Transactions)
                .FirstOrDefaultAsync(p => p.PositionId == positionId);
            
            return position is null
                ? Result.Fail($"No transaction with Id {positionId} found.")
                : Result.Ok(MapToDto(position));
        }
        catch (Exception exc)
        {
            return Result.Fail(exc.Message);
        }
    }

    public async Task<Result<PositionDto>> CreatePositionAsync(PositionDto positionDto)
    {
        var dataTransaction = await _data.Database.BeginTransactionAsync();
        try
        {
            var position = new Position
            {
                AssetType = positionDto.AssetType,
                PositionState = PositionState.Open,
                Label = positionDto.Label,
                Transactions = [],
                CreatedAt = DateTime.UtcNow,
            };
            _data.Positions.Add(position);
            await _data.SaveChangesAsync();

            var transactionDto = positionDto.Transactions.First();
            transactionDto.PositionId = position.PositionId;
            
            var trans = _transactionService.Value;
            var transaction = await trans.CreateInitialTransactionAsync(transactionDto);
            if (transaction.IsFailed)
            {
                return Result.Fail("An error occurred");
            }

            var tValue = transaction.Value;

            position.Roi = tValue.TransactionType == TransactionType.Buy ? tValue.Total : tValue.Total * -1;
            await _data.SaveChangesAsync();
            
            await dataTransaction.CommitAsync();
            return Result.Ok(MapToDto(position));
        }
        catch (Exception exc)
        {
            return Result.Fail($"An error occurred: {exc.Message}");
        }
    }

    public async Task<Result<PositionDto>> UpdatePositionAsync(PositionDto positionDto)
    {
        try
        {
            var position = await _data.Positions
                .Include(x => x.Transactions)
                .FirstOrDefaultAsync(p => p.PositionId == positionDto.PositionId);

            if (position is null)
            {
                Result.Fail($"No position with Id {positionDto.PositionId} found.");
            }

            position.AssetType = positionDto.AssetType;
            position.Label = positionDto.Label;
            position.UpdatedAt = DateTime.UtcNow;
            await _data.SaveChangesAsync();
            
            return Result.Ok(MapToDto(position));
        }
        catch (Exception exc)
        {
            return Result.Fail($"An error occurred: {exc.Message}");
        }
    }

    public async Task<Result> DeletePositionAsync(int positionId)
    {
        try
        {
            var position = await _data.Positions.FindAsync(positionId);
            if (position is null)
            {
                return Result.Fail($"No position with Id {positionId} found.");
            }

            _data.Positions.Remove(position);
            await _data.SaveChangesAsync();
            
            return Result.Ok();
        }
        catch (Exception exc)
        {
            return Result.Fail(exc.Message);
        }
    }

    public async Task<Result<PositionDto>> UpdatePositionRoiAndStateAsync(int positionId)
    {
        try
        {
            var position = await _data.Positions
                .Include(x => x.Transactions)
                .FirstOrDefaultAsync(p => p.PositionId == positionId);

            if (position is null)
            {
                return Result.Fail($"No position with Id {positionId} found.");
            }

            if (position.Transactions.Count == 0)
            {
                _data.Positions.Remove(position);
                await _data.SaveChangesAsync();
                return Result.Ok();
            }

            (position.Roi, position.PositionState) = CalculateRoiAndState(position.Transactions);
            
            
            await _data.SaveChangesAsync();
            
            return Result.Ok(MapToDto(position));
        }
        catch (Exception exc)
        {
            return Result.Fail($"An error occurred: {exc.Message}");
        }
    }

    private static PositionDto MapToDto(Position position)
    {
        return new PositionDto
        {
            PositionId = position.PositionId,
            AssetType = position.AssetType,
            Label = position.Label,
            Transactions = MapToTransactionDto(position.Transactions),
            PositionState = position.PositionState,
            Roi = position.Roi
        };
    }
    
    private static List<TransactionDto> MapToTransactionDto(List<Transaction> transactions)
    {
        List<TransactionDto> tDtos = [];

        foreach (var t in transactions)
        {
            var tDto = new TransactionDto
            {
                TransactionId = t.TransactionId,
                TransactionPrice = t.TransactionPrice,
                TransactionType = t.TransactionType,
                TransactionDate = t.TransactionDate,
                Quantity = t.Quantity,
                Commission = t.Commission,
                Tax = t.Tax,
                Total = t.Total,
                Currency = t.Currency,
                Notes = t.Notes,
                PositionId = t.PositionId
            };
            tDtos.Add(tDto);
        }

        return tDtos;
    }
    
    private static (double roi, PositionState state) CalculateRoiAndState(List<Transaction> transactions)
    {
        double roi = 0;
        var buyCount = 0;
        var sellCount = 0;

        foreach (var transaction in transactions)
        {
            if (transaction.TransactionType == TransactionType.Buy)
            {
                roi += transaction.Total;
                buyCount++;
            }
            else if (transaction.TransactionType == TransactionType.Sell)
            {
                roi -= transaction.Total;
                sellCount++;
            }
        }

        var state = buyCount == sellCount ? PositionState.Closed : PositionState.Open;

        return (roi, state);
    }
}