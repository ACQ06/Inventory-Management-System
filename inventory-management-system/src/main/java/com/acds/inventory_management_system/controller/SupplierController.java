package com.acds.inventory_management_system.controller;
import lombok.AllArgsConstructor;
import com.acds.inventory_management_system.model.Supplier;
import com.acds.inventory_management_system.service.SupplierService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/suppliers")
public class SupplierController {
    private SupplierService supplierService;

    @PostMapping
    public ResponseEntity<Supplier> createSupplier(@RequestBody Supplier supplier){
        Supplier saveSupplier = supplierService.createSupplier(supplier);
        return new ResponseEntity<>(saveSupplier, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable("id") Long supplierId){
        Supplier supplier = supplierService.getSupplierById(supplierId);
        return new ResponseEntity<>(supplier, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Supplier>> getAllSuppliers(){
        List<Supplier> suppliers = supplierService.getAllSuppliers();
        return new ResponseEntity<>(suppliers, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Supplier> updateSupplier(@PathVariable("id") Long supplierId, @RequestBody Supplier supplier){
        supplier.setId(supplierId);
        Supplier updatedSupplier = supplierService.updateSupplier(supplier);
        return new ResponseEntity<>(updatedSupplier, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSupplier(@PathVariable("id") Long supplierId){
        supplierService.deleteSupplier(supplierId);
        return new ResponseEntity<>("Admin successfully deleted!", HttpStatus.OK);
    }
}
