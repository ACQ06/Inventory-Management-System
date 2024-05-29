package com.acds.inventory_management_system.service;
import com.acds.inventory_management_system.model.SalesOrder;
import java.util.List;
public interface SalesOrderService {
    SalesOrder createSalesOrder(SalesOrder salesOrder);
    SalesOrder getSalesOrderById(Long salesOrderId);
    List<SalesOrder> getAllSalesOrders();
    SalesOrder updateSalesOrder(SalesOrder salesOrder);
    void deleteSalesOrder(long salesOrderId);
}
