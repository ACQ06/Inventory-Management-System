package com.acds.inventory_management_system.controller;
import lombok.AllArgsConstructor;
import com.acds.inventory_management_system.model.Admin;
import com.acds.inventory_management_system.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admins")
public class AdminController {
    private AdminService adminService;

    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin){
        Admin saveAdmin = adminService.createAdmin(admin);
        return new ResponseEntity<>(saveAdmin, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable("id") Long adminId){
        Admin admin = adminService.getAdminById(adminId);
        return new ResponseEntity<>(admin, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins(){
        List<Admin> admins = adminService.getAllAdmins();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable("id") Long adminId, @RequestBody Admin admin){
        admin.setId(adminId);
        Admin updatedAdmin = adminService.updateAdmin(admin);
        return new ResponseEntity<>(updatedAdmin, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable("id") Long adminId){
        adminService.deleteAdmin(adminId);
        return new ResponseEntity<>("Admin successfully deleted!", HttpStatus.OK);
    }
}