package com.acds.inventory_management_system.service.impl;

import com.acds.inventory_management_system.model.InventoryManager;
import com.acds.inventory_management_system.repository.InventoryManagerRepository;
import com.acds.inventory_management_system.service.InventoryManagerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class InventoryManagerImpl implements InventoryManagerService{
    private InventoryManagerRepository inventoryManagerRepository;

    @Override
    public InventoryManager createInventoryManager(InventoryManager inventoryManager){
        return inventoryManagerRepository.save(inventoryManager);
    }

    @Override
    public InventoryManager getInventoryManagerById(Long inventoryManagerId){
        Optional<InventoryManager> optionalInventoryManager = inventoryManagerRepository.findById(inventoryManagerId);
        return optionalInventoryManager.get();
    }

    @Override
    public List<InventoryManager> getAllInventoryManagers(){
        return inventoryManagerRepository.findAll();
    }

    @Override
    public InventoryManager updateInventoryManager(InventoryManager inventoryManager){
        InventoryManager existingInventoryManager = inventoryManagerRepository.findById(inventoryManager.getId()).get();
        existingInventoryManager.setName(inventoryManager.getName());
        existingInventoryManager.setPassword(inventoryManager.getPassword());

        InventoryManager updatedInventoryManager = inventoryManagerRepository.save(existingInventoryManager);
        return updatedInventoryManager;
    }

    @Override
    public void deleteInventoryManager(long inventoryManagerId) {
        inventoryManagerRepository.deleteById(inventoryManagerId);
    }
}
