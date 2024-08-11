using System.Text.Json;
using Alpaca.Markets;
using FluentResults;
using TradingJournal.Dtos;
using TradingJournal.Interfaces;
using TradingJournal.Services.Helpers;

namespace TradingJournal.Services;

public class DataService : IDataService
{
    
    
    private const String KEY_ID = "PKF5OOQIW9RB94Y7FY9N";
    private const String SECRET_KEY = "wmMm1mlV1lxhXG46cGWk1khIURBUSFXSOOFvQZk7";
    
    
    public async Task<Result<List<HistoricalBarDto>>> GetHistoricalBarsAsync(string symbol, DateTime from, DateTime into)
    {
        try
        {
            var client = Alpaca.Markets.Environments.Paper
                .GetAlpacaDataClient(new SecretKey(KEY_ID, SECRET_KEY));
            var bars = await client.ListHistoricalBarsAsync(
                new HistoricalBarsRequest(symbol, from, into, BarTimeFrame.Day));

            var dtoBars = bars.Items.Select(bar => new HistoricalBarDto
            {
                Open = bar.Open,
                High = bar.High,
                Low = bar.Low,
                Close = bar.Close,
                TimeStamp = bar.TimeUtc
            }).ToList();
        
            return Result.Ok(dtoBars);
        } 
        catch (Exception e)
        {
            return Result.Fail(e.Message);
        }
    }


    public async Task<Result<List<SymbolDto>>> GetSymbolsAsync(string? search)
    {
        var jsonData = await File.ReadAllTextAsync("Assets/company_tickers.json");
        var data = JsonSerializer.Deserialize<Dictionary<string, CompanyData>>(jsonData);

        var symbolDtos = data!.Values.Select(companyData => new SymbolDto
        {
            Ticker = companyData.ticker,
            CompanyName = companyData.title
        });
        
        if (search != null)
        {
            symbolDtos = symbolDtos
                .Where(symbolDto => symbolDto.CompanyName.StartsWith(search, StringComparison.OrdinalIgnoreCase) || symbolDto.Ticker.StartsWith(search, StringComparison.OrdinalIgnoreCase))
                .OrderBy(symbolDto => symbolDto.CompanyName)
                .Take(25);
        }
        else
        {
            var random = new Random();
            symbolDtos = symbolDtos
                .OrderBy(symbolDto => random.Next())
                .Take(25);
        }
        return Result.Ok(symbolDtos.ToList());
    }

    private async Task<Result<SymbolDto>> GetSymbolAsync(string symbol)
    {
        try
        {
            var jsonData = await File.ReadAllTextAsync("Assets/company_tickers.json");
            var data = JsonSerializer.Deserialize<Dictionary<string, CompanyData>>(jsonData); 
        
            var symbolDtos = data!.Values.Select(companyData => new SymbolDto
            {
                Ticker = companyData.ticker,
                CompanyName = companyData.title
            });
        
        
            var symbolDto = symbolDtos.FirstOrDefault(symbolDto => symbolDto.Ticker.Equals(symbol, StringComparison.OrdinalIgnoreCase));

            return symbolDto is null ? Result.Fail($"No symbol found for {symbol}.") : Result.Ok(symbolDto);
        }
        catch (Exception e)
        {
            return Result.Fail(e.Message);
        }
    }
    
    
    public async Task<Result<StockDataDto>> GetStockDataAsync(string symbol)
    {
        try
        {
            var data = await GetHistoricalBarsAsync(symbol, DateTime.Now.AddDays(-365), DateTime.Now.AddDays(-1));
            var symbolDto = await GetSymbolAsync(symbol);

            var lastClosing = (double)data.Value.Last().Close;
            var previousLastClosing = (double)data.Value.ElementAt(data.Value.Count - 2).Close;
            var totalHigh = (double)data.Value.Max(bar => bar.High);
            var totalLow = (double)data.Value.Min(bar => bar.Low);
            
            
            var stockData = new StockDataDto
            {
                Ticker = symbolDto.Value.Ticker,
                CompanyName = symbolDto.Value.CompanyName,
                Price = lastClosing,
                Week52Low = totalLow,
                Week52High = totalHigh,
                Change = CalculatorService.CalculateChange(previousLastClosing, lastClosing),
                ChangePercent = CalculatorService.CalculateChangePercent(previousLastClosing, lastClosing),
                HistoricalBars = data.Value.ToArray()
            };
            
            return Result.Ok(stockData);
        }
        catch (Exception e)
        {
            return Result.Fail(e.Message);
        }
    }
    
    
    
    
    private class CompanyData
    {
        public string ticker { get; set; }
        public string title { get; set; }
    }
    
}