package com.acds.inventory_management_system.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "customer_order")
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private int customer_id;
    @Column(nullable = false)
    private double totalValue;
    @Column(nullable = false)
    @ElementCollection
    private List<String> itemList;
    @Column(nullable = false)
    @ElementCollection
    private List<Integer> itemCount;
    @Column(nullable = false)
    @ElementCollection
    private List<Double> priceList;
}
