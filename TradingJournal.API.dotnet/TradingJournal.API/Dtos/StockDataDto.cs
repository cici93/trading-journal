namespace TradingJournal.Dtos;

public class StockDataDto
{
    public string Ticker { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public double Price { get; set; }
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
    public HistoricalBarDto[] HistoricalBars { get; set; } = [];
}
