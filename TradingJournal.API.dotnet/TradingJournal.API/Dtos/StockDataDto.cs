using TradingJournal.Models.Api_Ninja;

namespace TradingJournal.Dtos;

public class StockDataDto
{
    public string Ticker { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public Price? Price { get; set; }
    public double Change { get; set; }
    public double ChangePercent { get; set; }
    public double Volume { get; set; }
    public double AvgVolume { get; set; }
    public double MarketCap { get; set; }
    public double PeRatio { get; set; }
    public double Week52High { get; set; }
    public double Week52Low { get; set; }
    public double YtdChange { get; set; }
    public string LastUpdated { get; set; } = string.Empty;
    public Logo? StockLogo { get; set; }
    public HistoricalBarDto[] HistoricalBars { get; set; } = [];
}

public class Price
{
    public double Value { get; set; }
    public string Currency { get; set; } = string.Empty;
    public DateTime LastUpdated { get; set; }
}