package com.fer.expense_tracker.model;

import jakarta.persistence.*;

@Entity
@Table(name = "expenses")

public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;

    private double amount;
    private String category;
    private String date;

    //getters
    public int getId(){
        return id;
    }

    public double getAmount(){
        return amount;
    }

    public String getCategory() {
        return category;
    }

    public String getDate(){
        return date;
    }

    //setters
    public void setId(int id){
        this.id = id;
    }

    public void setAmount(double amount){
        this.amount = amount;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
