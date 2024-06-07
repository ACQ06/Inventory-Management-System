package com.acds.inventory_management_system.model;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "purchase_order")
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private int customerId;
    @Column(nullable = false)
    private int managerId;
    @Column(nullable = false)
    @ElementCollection
    private List<String> productId;
    @Column(nullable = false)
    @ElementCollection
    private List<String> quantity;
    @Column(nullable = false)
    private Date date;
    @Column(nullable = false)
    private double totalValue;
    @Column(nullable = false)
    private short status;
    private String comment;
}
