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
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = false)
    private InventoryManager manager;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    @ManyToOne
    @JoinColumn(name = "batch_id", nullable = false)
    private ProductBatch productBatch;
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
