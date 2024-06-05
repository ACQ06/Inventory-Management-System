package com.acds.inventory_management_system.service.impl;

import com.acds.inventory_management_system.model.Customer;
import com.acds.inventory_management_system.repository.CustomerRepository;
import com.acds.inventory_management_system.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private CustomerRepository customerRepository;

    @Override
    public Customer createCustomer(Customer customer){
        return customerRepository.save(customer);
    }

    @Override
    public Customer getCustomerById(Long customerId){
        Optional<Customer> optionalCustomer = customerRepository.findById(customerId);
        return optionalCustomer.get();
    }

    @Override
    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }

    @Override
    public Customer updateCustomer(Customer customer){
        Customer existingCustomer = customerRepository.findById(customer.getId()).get();
        existingCustomer.setName(customer.getName());
        existingCustomer.setPassword(customer.getPassword());

        Customer updatedCustomer = customerRepository.save(existingCustomer);
        return updatedCustomer;
    }

    @Override
    public void deleteCustomer(long customerId) {
        customerRepository.deleteById(customerId);
    }
}
