using System.Text.Json.Serialization;
using TradingJournal.Constants;
using TradingJournal.Models;

namespace TradingJournal.Dtos;

public class PositionDto
{
    public int PositionId { get; set; }
    
    public string Label { get; set; } = string.Empty;
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public PositionState PositionState { get; set; }
    
    public double Roi { get; set; }

    public List<Transaction> Transactions { get; set; } = [];
}