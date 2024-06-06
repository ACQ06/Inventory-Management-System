package com.acds.inventory_management_system.service.impl;

import com.acds.inventory_management_system.model.Supplier;
import com.acds.inventory_management_system.repository.SupplierRepository;
import com.acds.inventory_management_system.service.SupplierService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SupplierServiceImpl implements SupplierService{
    private SupplierRepository supplierRepository;

    @Override
    public Supplier createSupplier(Supplier supplier){
        return supplierRepository.save(supplier);
    }

    @Override
    public Supplier getSupplierById(Long supplierId){
        Optional<Supplier> optionalSupplier = supplierRepository.findById(supplierId);
        return optionalSupplier.get();
    }

    @Override
    public List<Supplier> getAllSuppliers(){
        List<Supplier> filteredSupplier = supplierRepository.findAll().stream()
                .filter(supplier -> supplier.getROLE() == 4)
                .collect(Collectors.toList());

        return filteredSupplier;
    }

    @Override
    public Supplier updateSupplier(Supplier supplier){
        Supplier existingSupplier = supplierRepository.findById(supplier.getId()).get();
        existingSupplier.setName(supplier.getName());
        existingSupplier.setPassword(supplier.getPassword());

        Supplier updatedSupplier = supplierRepository.save(existingSupplier);
        return updatedSupplier;
    }

    @Override
    public void deleteSupplier(long supplierId) {
        supplierRepository.deleteById(supplierId);
    }
}
