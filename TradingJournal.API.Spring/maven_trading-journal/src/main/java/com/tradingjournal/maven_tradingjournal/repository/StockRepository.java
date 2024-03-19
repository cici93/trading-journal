package com.tradingjournal.maven_tradingjournal.repository;

import com.tradingjournal.maven_tradingjournal.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface StockRepository extends JpaRepository<Stock, Integer> {
}
