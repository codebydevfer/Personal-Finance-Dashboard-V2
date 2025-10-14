package com.fer.expense_tracker.repository;

import com.fer.expense_tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
}
