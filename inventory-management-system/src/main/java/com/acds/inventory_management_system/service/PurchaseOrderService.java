package com.acds.inventory_management_system.service;
import com.acds.inventory_management_system.model.PurchaseOrder;
import java.util.List;
public interface PurchaseOrderService {
    PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder);
    PurchaseOrder getPurchaseOrderById(Long purchaseOrderId);
    List<PurchaseOrder> getAllPurchaseOrders();
    PurchaseOrder updatePurchaseOrder(PurchaseOrder purchaseOrder);
    void deletePurchaseOrder(long purchaseOrderId);
}
