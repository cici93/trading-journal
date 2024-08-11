namespace TradingJournal.Services.Helpers;

public static class CalculatorService
{
    
    public static double CalculateChange(double price, double previousPrice)
    {
        return Math.Round(price - previousPrice, 2);
    }
    
    public static double CalculateChangePercent(double price, double previousPrice)
    {
        return Math.Round((price - previousPrice) / previousPrice * 100, 2);
    }
}