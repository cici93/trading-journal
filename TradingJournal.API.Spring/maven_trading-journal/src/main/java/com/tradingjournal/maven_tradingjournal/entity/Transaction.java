package com.tradingjournal.maven_tradingjournal.entity;

import com.tradingjournal.maven_tradingjournal.converter.TransactionTypeConverter;
import com.tradingjournal.maven_tradingjournal.enums.AssetType;
import com.tradingjournal.maven_tradingjournal.enums.TransactionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private int transactionId;

    @Enumerated(EnumType.STRING)
    @Column(name = "asset_type")
    private AssetType assetType;

    @Column(name = "label")
    private String label;

    @Column(name = "transaction_price")
    private double transactionPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type")
    private TransactionType transactionType;

    @Column(name = "transaction_date")
    private Date transactionDate;

    @Column(name = "quantity")
    private double quantity;

    @Column(name = "commission")
    private double commission;

    @Column(name = "currency")
    private String currency;

    @Column(name = "notes")
    private String notes;

//    @ManyToOne
//    private Stock stock;

}
