package com.reto03.grupog6.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reto03.grupog6.Entities.Client;
import com.reto03.grupog6.Repository.ClientRepository;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public Client addClient(Client client) {
        Boolean flat = true;

        if (client.getName() == null)
            flat = false;

        if (client.getEmail() == null)
            flat = false;

        if (client.getPassword() == null)
            flat = false;

        if (client.getAge() == null)
            flat = false;

        if (flat){
            // LoginRepository.addLogin(new Login(client.getIdClient(),"Client"));
            return clientRepository.addClient(client);
        } else {return client;}
    }

    public List<Client> getAll() {
        return (List<Client>) clientRepository.getAll();
    }

    public Client udpClient(Client client) {
        return clientRepository.updClient(client);
    }

    public Client getClient(Integer idClient) {
        return clientRepository.getClient(idClient);
    }

    public void delClient(Integer idClient) {
        clientRepository.deleteClient(idClient);
    }

    public Client getClientByEmailAndPassword(String email, String password) {   
        return clientRepository.getClientByEmailAndPassword(email, password);
    }
}