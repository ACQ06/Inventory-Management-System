package com.acds.inventory_management_system.service;
import com.acds.inventory_management_system.model.CustomerOrder;
import java.util.List;

public interface CustomerOrderService {
    CustomerOrder createCustomerOrder(CustomerOrder customerOrder);
    CustomerOrder getCustomerOrderById(Long customerOrderId);
    List<CustomerOrder> getAllCustomerOrders();
    CustomerOrder updateCustomerOrder(CustomerOrder customerOrder);
    void deleteCustomerOrder(long customerOrderId);
}
