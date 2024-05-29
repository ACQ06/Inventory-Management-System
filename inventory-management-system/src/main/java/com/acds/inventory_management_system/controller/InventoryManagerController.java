package com.acds.inventory_management_system.controller;
import lombok.AllArgsConstructor;
import com.acds.inventory_management_system.model.InventoryManager;
import com.acds.inventory_management_system.service.InventoryManagerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/inventoryManagers")
public class InventoryManagerController {
    private InventoryManagerService inventoryManagerService;

    @PostMapping
    public ResponseEntity<InventoryManager> createInventoryManager(@RequestBody InventoryManager inventoryManager){
        InventoryManager saveInventoryManager = inventoryManagerService.createInventoryManager(inventoryManager);
        return new ResponseEntity<>(saveInventoryManager, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<InventoryManager> getInventoryManagerById(@PathVariable("id") Long inventoryManagerId){
        InventoryManager inventoryManager = inventoryManagerService.getInventoryManagerById(inventoryManagerId);
        return new ResponseEntity<>(inventoryManager, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<InventoryManager>> getAllInventoryManagers(){
        List<InventoryManager> inventoryManagers = inventoryManagerService.getAllInventoryManagers();
        return new ResponseEntity<>(inventoryManagers, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<InventoryManager> updateInventoryManager(@PathVariable("id") Long inventoryManagerId, @RequestBody InventoryManager inventoryManager){
        inventoryManager.setId(inventoryManagerId);
        InventoryManager updatedInventoryManager = inventoryManagerService.updateInventoryManager(inventoryManager);
        return new ResponseEntity<>(updatedInventoryManager, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteInventoryManager(@PathVariable("id") Long inventoryManagerId){
        inventoryManagerService.deleteInventoryManager(inventoryManagerId);
        return new ResponseEntity<>("InventoryManager successfully deleted!", HttpStatus.OK);
    }
}
