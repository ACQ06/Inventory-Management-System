package com.acds.inventory_management_system.repository;

import com.acds.inventory_management_system.model.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long>{

}