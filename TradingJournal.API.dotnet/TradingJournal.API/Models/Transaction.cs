using System.Text.Json.Serialization;
using TradingJournal.Constants;
using TradingJournal.Models.Base;

namespace TradingJournal.Models;

public class Transaction : BaseEntity
{
    public int TransactionId { get; set; }
    
    public double TransactionPrice { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public TransactionType TransactionType { get; set; }

    public double? Quantity { get; set; }

    public double? Commission { get; set; }

    public double? Tax { get; set; }
    
    public double? Total { get; set; }

    public string Currency { get; set; } = string.Empty;

    public string Notes { get; set; } = string.Empty;
    
    public int PositionId { get; set; }

    public DateTime? CreatedAt { get; set; }
    
    public DateTime? UpdatedAt { get; set; }
}