using FluentResults;
using TradingJournal.Dtos;

namespace TradingJournal.Interfaces;

public interface ITransactionService
{
    Task<Result<List<TransactionDto>>> GetTransactionsAsync();
    Task<Result<TransactionDto>> GetTransactionByIdAsync(int id);
    Task<Result<TransactionDto>> CreateInitialTransactionAsync(TransactionDto transactionDto);
    Task<Result<PositionDto>> CreateTransactionAsync(TransactionDto transactionDto);
    Task<Result<TransactionDto>> UpdateTransactionAsync(TransactionDto transactionDto);
    Task<Result> DeleteTransactionAsync(int id);
}