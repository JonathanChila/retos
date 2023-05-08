package com.reto03.grupog6.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reto03.grupog6.Entities.Admin;
import com.reto03.grupog6.Repository.AdminRepository;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    
    public Admin addAdmin(Admin admin) {
        Boolean flat = true;

        if(admin.getName() == null)
            flat = false;
        
        if(admin.getEmail() == null)
            flat = false;
        
        if(admin.getPassword() == null)
            flat = false;
        
        if(flat){
            // LoginRepository.addLogin(new Login(admin.getIdAdmin(),"Admin"));
            return adminRepository.addAdmin(admin);
        } else{return admin;}          
    }

    public List<Admin> getAll() {
        return (List<Admin>) adminRepository.getAll();
    }

    public Admin udpAdmin(Admin admin){
        return adminRepository.updAdmin(admin);
    }

    public Admin getAdmin(Integer idAdmin){
        return adminRepository.getAdmin(idAdmin);
    }

    public void delAdmin(Integer idAdmin){
        adminRepository.deleteAdmin(idAdmin);
    }

    public Admin getAdminByEmailAndPassword(String email, String password) {   
        return adminRepository.getAdminByEmailAndPassword(email, password);
    }
}