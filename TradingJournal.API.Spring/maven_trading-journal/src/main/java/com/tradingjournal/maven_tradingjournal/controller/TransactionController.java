package com.tradingjournal.maven_tradingjournal.controller;

import com.tradingjournal.maven_tradingjournal.entity.Stock;
import com.tradingjournal.maven_tradingjournal.entity.Transaction;
import com.tradingjournal.maven_tradingjournal.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/transaction")
@CrossOrigin(origins = "*")
public class TransactionController {

    private TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping({"/{id}"})
    public Transaction findById(@PathVariable int id) {
        return transactionService.findById(id);
    }

    @GetMapping("/data")
    public List<Transaction> getTransactions() {
        return transactionService.findAll();
    }

    @PostMapping
    public void addTransaction(@RequestBody Transaction transaction) {
        transactionService.add(transaction);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTransaction(@PathVariable int id) {
        transactionService.deleteStock(id);
    }
}
