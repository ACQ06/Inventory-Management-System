package com.acds.inventory_management_system.service.impl;


import com.acds.inventory_management_system.model.PurchaseOrder;
import com.acds.inventory_management_system.model.SalesOrder;
import com.acds.inventory_management_system.repository.PurchaseOrderRepository;
import com.acds.inventory_management_system.service.PurchaseOrderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PurchaseOrderServiceImpl implements PurchaseOrderService{
    private PurchaseOrderRepository purchaseOrderRepository;

    @Override
    public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder){
        return purchaseOrderRepository.save(purchaseOrder);
    }

    @Override
    public PurchaseOrder getPurchaseOrderById(Long purchaseOrderId){
        Optional<PurchaseOrder> optionalPurchaseOrder = purchaseOrderRepository.findById(purchaseOrderId);
        return optionalPurchaseOrder.get();
    }

    @Override
    public List<PurchaseOrder> getAllPurchaseOrders(){
        return purchaseOrderRepository.findAll();
    }

    @Override
    public PurchaseOrder updatePurchaseOrder(PurchaseOrder purchaseOrder){
        PurchaseOrder existingPurchaseOrder = purchaseOrderRepository.findById(purchaseOrder.getId()).get();
        existingPurchaseOrder.setCustomerId(purchaseOrder.getCustomerId());
        existingPurchaseOrder.setManagerId(purchaseOrder.getManagerId());
        existingPurchaseOrder.setProductId(purchaseOrder.getProductId());
        existingPurchaseOrder.setQuantity(purchaseOrder.getQuantity());
        existingPurchaseOrder.setDate(purchaseOrder.getDate());
        existingPurchaseOrder.setTotalValue(purchaseOrder.getTotalValue());
        existingPurchaseOrder.setStatus(purchaseOrder.getStatus());
        existingPurchaseOrder.setComment(purchaseOrder.getComment());
        PurchaseOrder updatedPurchaseOrder = purchaseOrderRepository.save(existingPurchaseOrder);
        return updatedPurchaseOrder;
    }

    @Override
    public void deletePurchaseOrder(long purchaseOrderId) {
        purchaseOrderRepository.deleteById(purchaseOrderId);
    }
}
