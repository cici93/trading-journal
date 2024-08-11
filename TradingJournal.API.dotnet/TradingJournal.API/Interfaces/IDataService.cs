using System.Runtime.InteropServices.JavaScript;
using FluentResults;
using TradingJournal.Dtos;

namespace TradingJournal.Interfaces;

public interface IDataService
{
    Task<Result<List<HistoricalBarDto>>> GetHistoricalBarsAsync(string symbol, DateTime from, DateTime into);
    Task<Result<List<SymbolDto>>> GetSymbolsAsync(string? search);

    Task<Result<StockDataDto>> GetStockDataAsync(string symbol);
}