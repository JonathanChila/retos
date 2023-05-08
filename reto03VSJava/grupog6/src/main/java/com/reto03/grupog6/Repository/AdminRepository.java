package com.reto03.grupog6.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog6.CrudRepository.AdminCrudRepository;
import com.reto03.grupog6.Entities.Admin;

@Repository
public class AdminRepository {
    @Autowired
    private AdminCrudRepository adminCrudRepository;

    //save the entity in the database
    public Admin addAdmin(Admin admin) {
        if (admin.getIdAdmin() == null || admin.getIdAdmin() == 0)
            return adminCrudRepository.save(admin);
        else
            return admin;
    }

    //returns all the entities in the database
    public List<Admin> getAll() {
        return (List<Admin>) adminCrudRepository.findAll();
    }

    //this method allows us to determine if the admin exist or not in the database
    private Admin existAdmin(Integer idAdmin) {
        Optional<Admin> objAdmin = adminCrudRepository.findById(idAdmin);
        Admin objAdminReturn;

        if (objAdmin.isEmpty())
            objAdminReturn = null;
        else
            objAdminReturn = objAdmin.get();

        return objAdminReturn;
    }

    //Update the data of the entity identified
    public Admin updAdmin(Admin admin){
        Admin objAdmin;

        objAdmin = existAdmin(admin.getIdAdmin());
        if(objAdmin == null)
            return admin;
        else{
            if (admin.getName() != null)
                objAdmin.setName(admin.getName());

            if (admin.getEmail() != null)
                objAdmin.setEmail(admin.getEmail());

            if (admin.getPassword() != null)
                objAdmin.setPassword(admin.getPassword());

            return adminCrudRepository.save(objAdmin);
        }
    }

    public void deleteAdmin(Integer idAdmin){
        Admin objAdmin;

        objAdmin = existAdmin(idAdmin);
        if(objAdmin != null)
            adminCrudRepository.delete(objAdmin);
    }

    public Admin getAdmin(Integer idAdmin){
        Admin objAdmin;

        objAdmin = existAdmin(idAdmin);
        if (objAdmin != null)
            return objAdmin;
        else
            return null;
    }

    public Admin getAdminByEmailAndPassword(String email, String password) {
        return adminCrudRepository.findByEmailAndPassword(email, password);
    }

}