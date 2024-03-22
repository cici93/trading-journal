using System.Text.Json.Serialization;
using TradingJournal.Constants;

namespace TradingJournal.Models;

public class Position
{
    public int PositionId { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public AssetType AssetType { get; set; }
    
    public string Label { get; set; } = string.Empty;
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public PositionState PositionState { get; set; }
    
    public double Roi { get; set; }

    public List<Transaction> Transactions { get; set; } = [];
    
    public DateTime? CreatedAt { get; set; }
    
    public DateTime? UpdatedAt { get; set; }
}