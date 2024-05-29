package com.acds.inventory_management_system.service;
import com.acds.inventory_management_system.model.Admin;
import java.util.List;

public interface AdminService {
    Admin createAdmin(Admin admin);
    Admin getAdminById(Long adminId);
    List<Admin> getAllAdmins();
    Admin updateAdmin(Admin admin);
    void deleteAdmin(long adminId);
}
