using Microsoft.AspNetCore.Mvc;
using TradingJournal.Dtos;
using TradingJournal.Interfaces;

namespace TradingJournal.Controller;

[Route("api/[controller]")]
[ApiController]
public class TransactionController(ITransactionService transactionService) : ControllerBase
{
    private readonly ITransactionService _transactionService = transactionService;
    
    [HttpGet]
    public async Task<ActionResult<List<TransactionDto>>> GetTransactions()
    {
        var result = await _transactionService.GetTransactionsAsync();
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Errors.First().Message);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TransactionDto>> GetTransactionById(int id)
    {
        var result = await _transactionService.GetTransactionByIdAsync(id);
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Errors.First().Message);
    }

    [HttpPost]
    public async Task<ActionResult<TransactionDto>> CreateTransaction([FromBody] TransactionDto transactionDto)
    {
        var result = await _transactionService.CreateTransactionAsync(transactionDto);
        return result.IsSuccess ? Ok(result.Value) : Problem(result.Errors.First().Message);
    }

    [HttpPut]
    public async Task<ActionResult<TransactionDto>> UpdateTransaction([FromBody] TransactionDto transactionDto)
    {
        var result = await _transactionService.UpdateTransactionAsync(transactionDto);
        return result.IsSuccess ? Ok(result.Value) : Problem(result.Errors.First().Message);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTransaction(int id)
    {
        var result = await _transactionService.DeleteTransactionAsync(id);
        return result.IsSuccess ? Ok() : NotFound(result.Errors.First().Message);
    }
}