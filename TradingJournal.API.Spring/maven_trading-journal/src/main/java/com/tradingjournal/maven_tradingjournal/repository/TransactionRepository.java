package com.tradingjournal.maven_tradingjournal.repository;

import com.tradingjournal.maven_tradingjournal.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
}
