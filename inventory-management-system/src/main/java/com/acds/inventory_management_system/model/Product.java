package com.acds.inventory_management_system.model;
import com.fasterxml.jackson.databind.deser.impl.NullsAsEmptyProvider;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private int supplierId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private double price;
    @Column(nullable = false)
    private int quantity;
}
