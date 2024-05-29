package com.acds.inventory_management_system.service.impl;

import com.acds.inventory_management_system.model.Admin;
import com.acds.inventory_management_system.model.SalesOrder;
import com.acds.inventory_management_system.repository.AdminRepository;
import com.acds.inventory_management_system.repository.SalesOrderRepository;
import com.acds.inventory_management_system.service.SalesOrderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SalesOrderServiceImpl implements SalesOrderService {
    private SalesOrderRepository salesOrderRepository;

    @Override
    public SalesOrder createSalesOrder(SalesOrder salesOrder){
        return salesOrderRepository.save(salesOrder);
    }

    @Override
    public SalesOrder getSalesOrderById(Long salesOrderId){
        Optional<SalesOrder> optionalSalesOrder = salesOrderRepository.findById(salesOrderId);
        return optionalSalesOrder.get();
    }

    @Override
    public List<SalesOrder> getAllSalesOrders(){
        return salesOrderRepository.findAll();
    }

    @Override
    public SalesOrder updateSalesOrder(SalesOrder salesOrder){
        SalesOrder existingSalesOrder = salesOrderRepository.findById(salesOrder.getId()).get();
        existingSalesOrder.setCustomer(salesOrder.getCustomer());
        existingSalesOrder.setManager(salesOrder.getManager());
        existingSalesOrder.setProduct(salesOrder.getProduct());
        existingSalesOrder.setProductBatch(salesOrder.getProductBatch());
        existingSalesOrder.setQuantity(salesOrder.getQuantity());
        existingSalesOrder.setDate(salesOrder.getDate());
        existingSalesOrder.setTotalValue(salesOrder.getTotalValue());
        existingSalesOrder.setStatus(salesOrder.getStatus());
        existingSalesOrder.setComment(salesOrder.getComment());

        SalesOrder updatedSalesOrder = salesOrderRepository.save(existingSalesOrder);
        return updatedSalesOrder;
    }

    @Override
    public void deleteSalesOrder(long salesOrderId) {
        salesOrderRepository.deleteById(salesOrderId);
    }
}
