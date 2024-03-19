package com.tradingjournal.maven_tradingjournal.converter;

import com.tradingjournal.maven_tradingjournal.enums.TransactionType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TransactionTypeConverter implements AttributeConverter<TransactionType, String> {

    @Override
    public String convertToDatabaseColumn(TransactionType transactionType) {
        return transactionType != null ? transactionType.toString() : null;
    }

    @Override
    public TransactionType convertToEntityAttribute(String s) {
        return s != null ? TransactionType.valueOf(s) : null;
    }
}
