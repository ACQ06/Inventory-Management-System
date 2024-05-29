package com.acds.inventory_management_system.controller;
import lombok.AllArgsConstructor;
import com.acds.inventory_management_system.model.PurchaseOrder;
import com.acds.inventory_management_system.service.PurchaseOrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/purchaseOrders")
public class PurchaseOrderController {
    private PurchaseOrderService purchaseOrderService;

    @PostMapping
    public ResponseEntity<PurchaseOrder> createPurchaseOrder(@RequestBody PurchaseOrder purchaseOrder){
        PurchaseOrder savePurchaseOrder = purchaseOrderService.createPurchaseOrder(purchaseOrder);
        return new ResponseEntity<>(savePurchaseOrder, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<PurchaseOrder> getPurchaseOrderById(@PathVariable("id") Long purchaseOrderId){
        PurchaseOrder purchaseOrder = purchaseOrderService.getPurchaseOrderById(purchaseOrderId);
        return new ResponseEntity<>(purchaseOrder, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PurchaseOrder>> getAllPurchaseOrders(){
        List<PurchaseOrder> purchaseOrders = purchaseOrderService.getAllPurchaseOrders();
        return new ResponseEntity<>(purchaseOrders, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<PurchaseOrder> updatePurchaseOrder(@PathVariable("id") Long purchaseOrderId, @RequestBody PurchaseOrder purchaseOrder){
        purchaseOrder.setId(purchaseOrderId);
        PurchaseOrder updatedPurchaseOrder = purchaseOrderService.updatePurchaseOrder(purchaseOrder);
        return new ResponseEntity<>(updatedPurchaseOrder, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deletePurchaseOrder(@PathVariable("id") Long purchaseOrderId){
        purchaseOrderService.deletePurchaseOrder(purchaseOrderId);
        return new ResponseEntity<>("Purchase Order successfully deleted!", HttpStatus.OK);
    }
}
