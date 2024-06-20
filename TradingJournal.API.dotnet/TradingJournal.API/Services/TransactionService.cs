using FluentResults;
using Microsoft.EntityFrameworkCore;
using TradingJournal.Constants;
using TradingJournal.Data;
using TradingJournal.Dtos;
using TradingJournal.Interfaces;
using TradingJournal.Models;

namespace TradingJournal.Services;

public class TransactionService(DataContext data, Lazy<IPositionService> positionService) : ITransactionService
{
    private readonly DataContext _data = data;
    private readonly Lazy<IPositionService> _positionService = positionService;
    
    public async Task<Result<List<TransactionDto>>> GetTransactionsAsync()
    {
        try
        {
            var transactions = await _data.Transactions.ToListAsync();
            return transactions.Count == 0
                ? Result.Fail("No Transactions available.")
                : Result.Ok(transactions.Select(MapToDto).ToList());
        }
        catch (Exception exc)
        {
            return Result.Fail(exc.Message);
        }
    }

    public async Task<Result<TransactionDto>> GetTransactionByIdAsync(int transactionId)
    {
        try
        {
            var transaction = await _data.Transactions.FindAsync(transactionId);
            return transaction is null
                ? Result.Fail($"No transaction with Id {transactionId} found.")
                : Result.Ok(MapToDto(transaction));
        }
        catch (Exception exc)
        {
            return Result.Fail(exc.Message);
        }
    }

    public async Task<Result<TransactionDto>> CreateInitialTransactionAsync(TransactionDto transactionDto)
    {
        try
        {
            var transaction = MapToTransaction(transactionDto);
            transaction.Total = CalculateTotal(transactionDto);
            transaction.CreatedAt = DateTime.UtcNow;
            _data.Transactions.Add(transaction);
            await _data.SaveChangesAsync();
            
            return Result.Ok(MapToDto(transaction));
        }
        catch (Exception exc)
        {
            return Result.Fail(exc.Message);
        }
    }

    public async Task<Result<PositionDto>> CreateTransactionAsync(TransactionDto transactionDto)
    {
        var dataTransaction = await _data.Database.BeginTransactionAsync();
        try
        {
            var transaction = MapToTransaction(transactionDto);
            transaction.Total = CalculateTotal(transactionDto);
            transaction.CreatedAt = DateTime.UtcNow;
            _data.Transactions.Add(transaction);
            await _data.SaveChangesAsync();

            var pos = _positionService.Value;
            var position = await pos.UpdatePositionRoiAndStateAsync(transaction.PositionId);
            if (position.IsFailed)
            {
                return Result.Fail("An error occurred");
            }

            await dataTransaction.CommitAsync();
            return position;
        }
        catch (Exception exc)
        {
            return Result.Fail(exc.Message);
        }
    }


    public async Task<Result<TransactionDto>> UpdateTransactionAsync(TransactionDto transactionDto)
    {
        var dataTransaction = await _data.Database.BeginTransactionAsync();
        try
        {
            var transaction = await _data.Transactions.FindAsync(transactionDto.TransactionId);
            if (transaction is null)
                return Result.Fail($"No transaction with Id {transactionDto.TransactionId} found.");
            
            transaction.TransactionPrice = transactionDto.TransactionPrice;
            transaction.TransactionType = transactionDto.TransactionType;
            transaction.Quantity = transactionDto.Quantity;
            transaction.Commission = transactionDto.Commission;
            transaction.Tax = transactionDto.Tax;
            transaction.Currency = transactionDto.Currency;
            transaction.Notes = transactionDto.Notes;
            transaction.UpdatedAt = DateTime.UtcNow;
            transaction.Total = CalculateTotal(transactionDto);
            
            await _data.SaveChangesAsync();
            
            var pos = _positionService.Value;
            var position = await pos.UpdatePositionRoiAndStateAsync(transaction.PositionId);
            
            if (position.IsFailed)
            {
                return Result.Fail("An error occurred");
            }
            
            await dataTransaction.CommitAsync();
            return Result.Ok(MapToDto(transaction));
        }
        catch (Exception exc)
        {
            return Result.Fail(exc.Message);
        }
    }

    public async Task<Result> DeleteTransactionAsync(int transactionId)
    {
        var dataTransaction = await _data.Database.BeginTransactionAsync();
        try
        {
            var transaction = await _data.Transactions.FindAsync(transactionId);
            if (transaction is null)
            {
                return Result.Fail($"No transaction with Id {transactionId} found.");
            }
            
            _data.Transactions.Remove(transaction);
            await _data.SaveChangesAsync();
            
            var pos = _positionService.Value;
            var position = await pos.UpdatePositionRoiAndStateAsync(transaction.PositionId);
            
            if (position.IsFailed)
            {
                return Result.Fail("An error occurred");
            }
            
            await dataTransaction.CommitAsync();
            
            return Result.Ok();
        }
        catch (Exception exc)
        {
            return Result.Fail(exc.Message);
        }
    }
    
    private static TransactionDto MapToDto(Transaction transaction)
    {
        return new TransactionDto
        {
            TransactionId = transaction.TransactionId,
            TransactionPrice = transaction.TransactionPrice,
            TransactionType = transaction.TransactionType,
            Quantity = transaction.Quantity,
            Commission = transaction.Commission,
            Tax = transaction.Tax,
            Currency = transaction.Currency,
            Notes = transaction.Notes,
            PositionId = transaction.PositionId
        };
    }

    private static Transaction MapToTransaction(TransactionDto transactionDto)
    {
        return new Transaction
        {
            TransactionId = transactionDto.TransactionId,
            TransactionPrice = transactionDto.TransactionPrice,
            TransactionType = transactionDto.TransactionType,
            Quantity = transactionDto.Quantity,
            Commission = transactionDto.Commission,
            Tax = transactionDto.Tax,
            Currency = transactionDto.Currency,
            Notes = transactionDto.Notes,
            PositionId = transactionDto.PositionId
        };
    }

    private static double CalculateTotal(TransactionDto transactionDto)
    {
        return 100;
        // return transactionDto.TransactionType switch
        // {
        //     TransactionType.Buy => transactionDto.TransactionPrice * transactionDto.Quantity -
        //                            transactionDto.Commission - transactionDto.Tax,
        //     TransactionType.Sell => transactionDto.TransactionPrice * transactionDto.Quantity +
        //                             transactionDto.Commission + transactionDto.Tax,
        //     _ => 0
        // };
    }
}