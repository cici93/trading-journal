package com.tradingjournal.maven_tradingjournal.controller;

import com.tradingjournal.maven_tradingjournal.entity.Stock;
import com.tradingjournal.maven_tradingjournal.service.StockService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/stock")
public class StockController {

    private StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }


    @GetMapping({"/{id}"})
    public Stock findById(@PathVariable int id) {
        return stockService.findById(id);
    }

    @GetMapping("/data")
    public List<Stock> getStocks() {
        return stockService.findAll();
    }

    @PostMapping("/post")
    public void addStock(@RequestBody Stock stock) {
        stockService.add(stock);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStock(@PathVariable int id) {
        stockService.deleteStock(id);
    }
}
