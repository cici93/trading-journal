using FluentResults;
using TradingJournal.Dtos;

namespace TradingJournal.Interfaces;

public interface IPositionService
{
    Task<Result<List<PositionDto>>> GetPositionsAsync();
    Task<Result<PositionDto>> GetPositionByIdAsync(int positionId);
    Task<Result<PositionDto>> CreatePositionAsync(PositionDto positionDto);
    Task<Result<PositionDto>> UpdatePositionAsync(PositionDto positionDto);
    Task<Result> DeletePositionAsync(int positionId);
    Task<Result<PositionDto>> UpdatePositionRoiAndStateAsync(int positionId);
}