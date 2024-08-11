namespace TradingJournal.Dtos;

public class HistoricalBarDto
{
    public decimal Open { get; set; }
    public decimal High { get; set; }
    public decimal Low { get; set; }
    public decimal Close { get; set; }
    public DateTime TimeStamp { get; set; }
}