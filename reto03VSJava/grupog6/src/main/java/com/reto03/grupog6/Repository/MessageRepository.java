package com.reto03.grupog6.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog6.CrudRepository.MessageCrudRepository;
import com.reto03.grupog6.Entities.Car;
import com.reto03.grupog6.Entities.Client;
import com.reto03.grupog6.Entities.Message;

@Repository
public class MessageRepository {
    @Autowired
    private MessageCrudRepository messageCrudRepository;

    //save the entity in the database
    public Message addMessage(Message message) {
        if (message.getIdMessage() == null || message.getIdMessage() == 0)
            return messageCrudRepository.save(message);
        else
            return message;
    }

    //returns all the entities in the database
    public List<Message> getAll() {
        return (List<Message>) messageCrudRepository.findAll();
    }

    //this method allows us to determine if the message exist or not in the database
    private Message existMessage(Integer idMessage) {
        Optional<Message> objMessage = messageCrudRepository.findById(idMessage);
        Message objMessageReturn;

        if (objMessage.isEmpty())
            objMessageReturn = null;
        else
            objMessageReturn = objMessage.get();

        return objMessageReturn;
    }

    //Update the data of the entity identified
    public Message updMessage(Message message){
        Message objMessage;
        Car car = new Car();
        Client client = new Client();

        objMessage = existMessage(message.getIdMessage());
        if(objMessage == null){
            return message;
        } else {
            if (message.getMessageText() != null)
                objMessage.setMessageText(message.getMessageText());
            
            if(message.getClient().getIdClient() != null ){
                client.setIdClient(message.getClient().getIdClient());  //porque no se fija el cliente con todos los atributos por ejemplo asi: client = message.getClient();
                objMessage.setClient(client);
            }
            
            if(message.getCar().getIdCar() != null ){
                car.setIdCar(message.getCar().getIdCar());
                objMessage.setCar(car);
            }
            return messageCrudRepository.save(objMessage);  //revisar error del profe: no es error ya que update en el crud no existe, por eso se usa save.
        }
    }

    public void deleteMessage(Integer idMessage){
        Message objMessage;

        objMessage = existMessage(idMessage);
        if(objMessage != null)
            messageCrudRepository.delete(objMessage);
    }

    public Message getMessage(Integer idMessage){
        Message objMessage;

        objMessage = existMessage(idMessage);
        if (objMessage != null)
            return objMessage;
        else
            return null;
    }
}