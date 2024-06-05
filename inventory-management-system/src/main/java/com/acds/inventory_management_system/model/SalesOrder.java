package com.acds.inventory_management_system.model;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Data
@Entity
@Table(name = "sales_order")
public class SalesOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private int customerId;
    @Column(nullable = false)
    private int managerId;
    @Column(nullable = false)
    private int productID;
    @Column(nullable = false)
    private int productBatch;
    @Column(nullable = false)
    private int quantity;
    @Column(nullable = false)
    private Date date;
    @Column(nullable = false)
    private double totalValue;
    @Column(nullable = false)
    private short status;
    private String comment;
}
