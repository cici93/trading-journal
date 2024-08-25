using System.Text.Json;
using System.Text.Json.Serialization;
using Alpaca.Markets;
using FluentResults;
using TradingJournal.Dtos;
using TradingJournal.Interfaces;
using TradingJournal.Models.Api_Ninja;
using TradingJournal.Services.Helpers;

namespace TradingJournal.Services;

public class DataService(IHttpClientFactory clientFactory) : IDataService
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
                Price = new Price
                {
                    Value = lastClosing,
                    Currency = "$",
                    LastUpdated = data.Value.Last().TimeStamp
                },
                Week52Low = totalLow,
                Week52High = totalHigh,
                Change = CalculatorService.CalculateChange(previousLastClosing, lastClosing),
                ChangePercent = CalculatorService.CalculateChangePercent(previousLastClosing, lastClosing),
                HistoricalBars = data.Value.ToArray()
            };

            stockData.StockLogo = await GetStockLogoAsync(stockData);
            
            return Result.Ok(stockData);
        }
        catch (Exception e)
        {
            return Result.Fail(e.Message);
        }
    }


    private async Task<Logo> GetStockLogoAsync(StockDataDto stockData)
    {
        var companyName = stockData.CompanyName.Split(" ")[0].Split(",")[0];
        var client = clientFactory.CreateClient();
        client.DefaultRequestHeaders.Add("X-Api-Key", "QCWidRN5xTmPdBEmQYg47Q==rhyEQytFirjSTFQ1");
        
        try
        {
            var response = await client.GetFromJsonAsync<List<Logo>>(
                $"https://api.api-ninjas.com/v1/logo?name={companyName}",
                new JsonSerializerOptions(JsonSerializerDefaults.Web));
            
            var matchingCompany = response.FirstOrDefault(x => x.Ticker == stockData.Ticker);

            if (matchingCompany is null)
            {
                throw new Exception($"No logo found for company {stockData.Ticker}.");
            }
            return matchingCompany;
        }
        catch (Exception e)
        {
            throw new Exception($"An error occurred while getting the stock logo {stockData.Ticker}: {e.Message}", e);
        }
    }
    
    private class CompanyData
    {
        public string ticker { get; set; }
        public string title { get; set; }
    }
    
}