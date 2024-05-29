package com.acds.inventory_management_system.controller;
import lombok.AllArgsConstructor;
import com.acds.inventory_management_system.model.SalesOrder;
import com.acds.inventory_management_system.service.SalesOrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/salesOrders")
public class SalesOrderController {
    private SalesOrderService salesOrderService;

    @PostMapping
    public ResponseEntity<SalesOrder> createSalesOrder(@RequestBody SalesOrder salesOrder){
        SalesOrder saveSalesOrder = salesOrderService.createSalesOrder(salesOrder);
        return new ResponseEntity<>(saveSalesOrder, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<SalesOrder> getSalesOrderById(@PathVariable("id") Long salesOrderId){
        SalesOrder salesOrder = salesOrderService.getSalesOrderById(salesOrderId);
        return new ResponseEntity<>(salesOrder, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<SalesOrder>> getAllSalesOrders(){
        List<SalesOrder> salesOrders = salesOrderService.getAllSalesOrders();
        return new ResponseEntity<>(salesOrders, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<SalesOrder> updateSalesOrder(@PathVariable("id") Long salesOrderId, @RequestBody SalesOrder salesOrder){
        salesOrder.setId(salesOrderId);
        SalesOrder updatedSalesOrder = salesOrderService.updateSalesOrder(salesOrder);
        return new ResponseEntity<>(updatedSalesOrder, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable("id") Long adminId){
        salesOrderService.deleteSalesOrder(adminId);
        return new ResponseEntity<>("Admin successfully deleted!", HttpStatus.OK);
    }
}
