package com.acds.inventory_management_system.service;
import com.acds.inventory_management_system.model.Supplier;
import java.util.List;

public interface SupplierService {
    Supplier createSupplier(Supplier supplier);
    Supplier getSupplierById(Long supplierId);
    List<Supplier> getAllSuppliers();
    Supplier updateSupplier(Supplier supplier);
    void deleteSupplier(long salesOrderId);
}
