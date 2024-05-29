package com.acds.inventory_management_system.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "inventory_manager")
public class InventoryManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String password;
}