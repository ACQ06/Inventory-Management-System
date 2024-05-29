package com.acds.inventory_management_system.service.impl;

import com.acds.inventory_management_system.model.Admin;
import com.acds.inventory_management_system.repository.AdminRepository;
import com.acds.inventory_management_system.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {
    private AdminRepository adminRepository;

    @Override
    public Admin createAdmin(Admin admin){
        return adminRepository.save(admin);
    }

    @Override
    public Admin getAdminById(Long adminId){
        Optional<Admin> optionalAdmin = adminRepository.findById(adminId);
        return optionalAdmin.get();
    }

    @Override
    public List<Admin> getAllAdmins(){
        return adminRepository.findAll();
    }

    @Override
    public Admin updateAdmin(Admin admin){
        Admin existingAdmin = adminRepository.findById(admin.getId()).get();
        existingAdmin.setName(admin.getName());
        existingAdmin.setPassword(admin.getPassword());

        Admin updatedAdmin = adminRepository.save(existingAdmin);
        return updatedAdmin;
    }

    @Override
    public void deleteAdmin(long adminId) {
        adminRepository.deleteById(adminId);
    }
}
