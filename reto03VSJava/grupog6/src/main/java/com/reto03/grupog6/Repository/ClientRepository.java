package com.reto03.grupog6.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog6.CrudRepository.ClientCrudRepository;
import com.reto03.grupog6.Entities.Client;

@Repository
public class ClientRepository {
    @Autowired
    private ClientCrudRepository clientCrudRepository;

    //save the entity in the database
    public Client addClient(Client client) {
        if (client.getIdClient() == null || client.getIdClient() == 0)
            return clientCrudRepository.save(client);
        else
            return client;
    }

    //returns all the entities in the database
    public List<Client> getAll() {
        return (List<Client>) clientCrudRepository.findAll();
    }

    //this method allows us to determine if the client exist or not in the database
    private Client existClient(Integer idClient) {
        Optional<Client> objClient = clientCrudRepository.findById(idClient);
        Client objClientReturn;

        if (objClient.isEmpty())
            objClientReturn = null;
        else
            objClientReturn = objClient.get();

        return objClientReturn;
    }

    //Update the data of the entity identified
    public Client updClient(Client client){
        Client objClient;

        objClient = existClient(client.getIdClient());
        if(objClient == null)
            return client;
        else{
            if (client.getName() != null)
                objClient.setName(client.getName());

            if (client.getEmail() != null)
                objClient.setEmail(client.getEmail());

            if (client.getPassword() != null)
                objClient.setPassword(client.getPassword());

            if (client.getAge() != null)
                objClient.setAge(client.getAge());

            return clientCrudRepository.save(objClient);  //revisar error del profe: no es error ya que update en el crud no existe, por eso se usa save.
        }         
    }

    public void deleteClient(Integer idClient){
        Client objClient;

        objClient = existClient(idClient);
        if(objClient != null)
            clientCrudRepository.delete(objClient);
    }

    public Client getClient(Integer idClient){
        Client objClient;

        objClient = existClient(idClient);
        if (objClient != null)
            return objClient;
        else
            return null;
    }

    public Client getClientByEmailAndPassword(String email, String password) {
        return clientCrudRepository.findByEmailAndPassword(email, password);
    }

}