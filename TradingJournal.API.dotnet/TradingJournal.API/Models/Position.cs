using System.Text.Json.Serialization;
using TradingJournal.Constants;
using TradingJournal.Models.Base;

namespace TradingJournal.Models;

public class Position : BaseEntity
{
    public int PositionId { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public AssetType AssetType { get; set; }
    
    public string Label { get; set; } = string.Empty;
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public PositionState PositionState { get; set; }
    
    public double Roi { get; set; }

    public List<Transaction> Transactions { get; set; } = [];
}