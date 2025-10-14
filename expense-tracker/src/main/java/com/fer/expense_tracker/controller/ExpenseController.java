package com.fer.expense_tracker.controller;

import com.fer.expense_tracker.model.Expense;
import com.fer.expense_tracker.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")

public class ExpenseController {

    private final ExpenseRepository repository;

    public ExpenseController(ExpenseRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense){
        return repository.save(expense);
    }

    @GetMapping
    public List<Expense> getAllExpenses(){
        return repository.findAll();
    }

//    @GetMapping("/")
//    public String home(){
//        return "App running!";
//    }
}
