package com.acds.inventory_management_system.service.impl;

import com.acds.inventory_management_system.model.CustomerOrder;
import com.acds.inventory_management_system.repository.CustomerOrderRepository;
import com.acds.inventory_management_system.service.CustomerOrderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomerOrderServiceImpl implements CustomerOrderService {
    private CustomerOrderRepository customerOrderRepository;

    @Override
    public CustomerOrder createCustomerOrder(CustomerOrder customerOrder){
        return customerOrderRepository.save(customerOrder);
    }

    @Override
    public CustomerOrder getCustomerOrderById(Long customerOrderId){
        Optional<CustomerOrder> optionalCustomerOrder = customerOrderRepository.findById(customerOrderId);
        return optionalCustomerOrder.get();
    }

    @Override
    public List<CustomerOrder> getAllCustomerOrders(){
        return customerOrderRepository.findAll();
    }

    @Override
    public CustomerOrder updateCustomerOrder(CustomerOrder customerOrder){
        CustomerOrder existingCustomerOrder = customerOrderRepository.findById(customerOrder.getId()).get();
        existingCustomerOrder.setCustomer_id(customerOrder.getCustomer_id());
        existingCustomerOrder.setItemList(customerOrder.getItemList());
        existingCustomerOrder.setTotalValue(customerOrder.getTotalValue());

        CustomerOrder updatedCustomerOrder = customerOrderRepository.save(existingCustomerOrder);
        return existingCustomerOrder;
    }

    @Override
    public void deleteCustomerOrder(long customerOrderId){
        customerOrderRepository.deleteById(customerOrderId);
    }
}
