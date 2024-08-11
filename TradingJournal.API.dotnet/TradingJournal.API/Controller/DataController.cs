using Microsoft.AspNetCore.Mvc;
using TradingJournal.Dtos;
using TradingJournal.Interfaces;

namespace TradingJournal.Controller;

[Route("api/[controller]")]
[ApiController]
public class DataController(IDataService dataService) : ControllerBase
{
    private readonly IDataService _dataService = dataService;
    
    [HttpGet("symbols")]
    public async Task<ActionResult<List<SymbolDto>>> GetSymbols(string? search)
    {
        var result = await _dataService.GetSymbolsAsync(search);
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Errors.First().Message);
    }
    
    [HttpGet("stock")]
    public async Task<ActionResult<StockDataDto>> GetStockData(string symbol)
    {
        var result = await _dataService.GetStockDataAsync(symbol);
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Errors.First().Message);
    }
    
    [HttpGet("bars")]
    public async Task<ActionResult<List<HistoricalBarDto>>> GetHistoricalBars(string symbol, string from, string into)
    {
        var fromDateTime = DateTime.Parse(from);
        var intoDateTime = DateTime.Parse(into);

        var result = await _dataService.GetHistoricalBarsAsync(symbol, fromDateTime, intoDateTime);
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Errors.First().Message);
    }
    
    
}