using Microsoft.AspNetCore.Mvc;
using TradingJournal.Dtos;
using TradingJournal.Interfaces;

namespace TradingJournal.Controller;

[Route("api/[controller]")]
[ApiController]
public class PositionController(IPositionService positionService) : ControllerBase
{
    private readonly IPositionService _positionService = positionService;

    [HttpGet]
    public async Task<ActionResult<List<PositionDto>>> GetPositions()
    {
        var result = await _positionService.GetPositionsAsync();
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Errors.First().Message);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PositionDto>> GetTransactionById(int id)
    {
        var result = await _positionService.GetPositionByIdAsync(id);
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Errors.First().Message);
    }
    
    [HttpPost]
    public async Task<ActionResult<PositionDto>> CreatePosition([FromBody] TransactionDto transactionDto)
    {
        var result = await _positionService.CreatePositionAsync(transactionDto);
        return result.IsSuccess ? Ok(result.Value) : Problem(result.Errors.First().Message);
    }

    [HttpPut]
    public async Task<ActionResult<PositionDto>> UpdatePosition([FromBody] PositionDto positionDto)
    {
        var result = await _positionService.UpdatePositionAsync(positionDto);
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Errors.First().Message);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePosition(int id)
    {
        var result = await _positionService.DeletePositionAsync(id);
        return result.IsSuccess ? Ok() : NotFound(result.Errors.First().Message);
    }
    
}