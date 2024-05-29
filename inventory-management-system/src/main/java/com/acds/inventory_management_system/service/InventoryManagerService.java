package com.acds.inventory_management_system.service;
import com.acds.inventory_management_system.model.InventoryManager;
import java.util.List;
public interface InventoryManagerService {
    InventoryManager createInventoryManager(InventoryManager inventoryManager);
    InventoryManager getInventoryManagerById(Long inventoryManagerId);
    List<InventoryManager> getAllInventoryManagers();
    InventoryManager updateInventoryManager(InventoryManager inventoryManager);
    void deleteInventoryManager(long inventoryManagerId);
}
