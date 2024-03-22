using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TradingJournal.Constants;
using TradingJournal.Models;

namespace TradingJournal.Data;

 public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
 {
     public DbSet<Transaction> Transactions { get; set; }
     public DbSet<Position> Positions { get; set; }

     protected override void OnModelCreating(ModelBuilder modelBuilder)
     {
         var transactionTypeConverter = new EnumToStringConverter<TransactionType>();
         modelBuilder.Entity<Transaction>()
             .Property(t => t.TransactionType)
             .HasConversion(transactionTypeConverter);
         
         var assetTypeConverter = new EnumToStringConverter<AssetType>();
         modelBuilder.Entity<Position>()
             .Property(t => t.AssetType)
             .HasConversion(assetTypeConverter);
         
         var positionStateConverter = new EnumToStringConverter<PositionState>();
         modelBuilder.Entity<Position>()
             .Property(t => t.PositionState)
             .HasConversion(positionStateConverter);
     }
}