package com.reto03.grupog6.CrudRepository;

import org.springframework.data.repository.CrudRepository;

import com.reto03.grupog6.Entities.Client;

public interface ClientCrudRepository extends CrudRepository<Client, Integer> {
    public Client findByEmailAndPassword(String email, String password);
    
}
