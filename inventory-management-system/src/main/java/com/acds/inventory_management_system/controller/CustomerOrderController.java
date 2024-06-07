package com.acds.inventory_management_system.controller;

import lombok.AllArgsConstructor;
import com.acds.inventory_management_system.model.CustomerOrder;
import com.acds.inventory_management_system.service.CustomerOrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/customerOrders")
public class CustomerOrderController {
    private CustomerOrderService customerOrderService;

    @PostMapping
    public ResponseEntity<CustomerOrder> createCustomerOrder(@RequestBody CustomerOrder customerOrder){
        CustomerOrder saveProductBatch = customerOrderService.createCustomerOrder(customerOrder);
        return new ResponseEntity<>(saveProductBatch, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<CustomerOrder> getCustomerOrderById(@PathVariable("id") Long customerOrderId){
        CustomerOrder customerOrder = customerOrderService.getCustomerOrderById(customerOrderId);
        return new ResponseEntity<>(customerOrder, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<CustomerOrder>> getAllCustomerOrder(){
        List<CustomerOrder> customerOrder = customerOrderService.getAllCustomerOrders();
        return new ResponseEntity<>(customerOrder, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<CustomerOrder> updateCustomerOrder(@PathVariable("id") Long customerOrderId, @RequestBody CustomerOrder customerOrder){
        customerOrder.setId(customerOrderId);
        CustomerOrder updatedcustomerOrder = customerOrderService.updateCustomerOrder(customerOrder);
        return new ResponseEntity<>(updatedcustomerOrder, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProductBatch(@PathVariable("id") Long customerOrderId){
        customerOrderService.deleteCustomerOrder(customerOrderId);
        return new ResponseEntity<>("Customer Order successfully deleted!", HttpStatus.OK);
    }
}
