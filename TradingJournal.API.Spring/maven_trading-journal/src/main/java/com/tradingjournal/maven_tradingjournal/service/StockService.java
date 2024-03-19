package com.tradingjournal.maven_tradingjournal.service;

import com.tradingjournal.maven_tradingjournal.entity.Stock;
import com.tradingjournal.maven_tradingjournal.repository.StockRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {
    private StockRepository stockRepository;

    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public List<Stock> findAll() {
        return (List<Stock>) stockRepository.findAll();
    }

    public Stock findById(int id) {
        return stockRepository.findById(id).get();
    }

    public void add(Stock stock) {
        stockRepository.save(stock);
    }

    public void deleteStock(int id) {
        stockRepository.deleteById(id);
    }
}
