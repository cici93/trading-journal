package com.tradingjournal.maven_tradingjournal.service;

import com.tradingjournal.maven_tradingjournal.entity.Stock;
import com.tradingjournal.maven_tradingjournal.entity.Transaction;
import com.tradingjournal.maven_tradingjournal.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TransactionService {
    private TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> findAll() {
        return (List<Transaction>) transactionRepository.findAll();
    }

    public Transaction findById(int id) {
        return transactionRepository.findById(id).get();
    }

    public void add(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    public void deleteStock(int id) {
        transactionRepository.deleteById(id);
    }

}
