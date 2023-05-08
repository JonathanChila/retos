package com.reto03.grupog6.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog6.CrudRepository.ReservationCrudRepository;
import com.reto03.grupog6.Entities.Car;
import com.reto03.grupog6.Entities.Client;
import com.reto03.grupog6.Entities.Reservation;
// import com.reto03.grupog6.Entities.Score;

@Repository
public class ReservationRepository {
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;

    @Autowired
    private ClientRepository clientRepository;


    //save the entity in the database
    public Reservation addReservation(Reservation reservation) {
        if (reservation.getIdReservation() == null || reservation.getIdReservation() == 0)
            return reservationCrudRepository.save(reservation);
        else
            return reservation;
    }

    //returns all the entities in the database
    public List<Reservation> getAll() {
        return (List<Reservation>) reservationCrudRepository.findAll();
    }

    //this method allows us to determine if the reservation exist or not in the database
    private Reservation existReservation(Integer idReservation) {
        Optional<Reservation> objReservation = reservationCrudRepository.findById(idReservation);
        Reservation objReservationReturn;

        if (objReservation.isEmpty())
            objReservationReturn = null;
        else
            objReservationReturn = objReservation.get();

        return objReservationReturn;
    }

    //Update the data of the entity identified
    public Reservation updReservation(Reservation reservation){
        Reservation objReservation;
        Client client = new Client();
        Car car = new Car();
        // Score score = new Score();

        objReservation = existReservation(reservation.getIdReservation());
        if(objReservation == null)
            return reservation;
        else {
            if (reservation.getStartDate() != null)
                objReservation.setStartDate(reservation.getStartDate());

            if (reservation.getDevolutionDate() != null)
                objReservation.setDevolutionDate(reservation.getDevolutionDate());

            if (reservation.getStatus() != null)
                objReservation.setStatus(reservation.getStatus());
            
            if(reservation.getClient().getIdClient() != null ){
                client.setIdClient(reservation.getClient().getIdClient());  //porque no se fija el cliente con todos los atributos por ejemplo asi: client = reservation.getClient();
                objReservation.setClient(client);
            }
            
            if(reservation.getCar().getIdCar() != null ){
                car.setIdCar(reservation.getCar().getIdCar());
                objReservation.setCar(car);
            }
            
            return reservationCrudRepository.save(objReservation);  //revisar error del profe: no es error ya que update en el crud no existe, por eso se usa save.   
        }
    }

    public void deleteReservation(Integer idReservation){
        Reservation objReservation;

        objReservation = existReservation(idReservation);
        if(objReservation != null)
            reservationCrudRepository.delete(objReservation);
    }

    public Reservation getReservation(Integer idReservation){
        Reservation objReservation;

        objReservation = existReservation(idReservation);
        if (objReservation != null)
            return objReservation;
        else
            return null;
    }


    public List<Reservation> getReportReservations(Date dateOne, Date dateTwo){
        return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(dateOne, dateTwo);
    }

    public Integer getReportStatusByQuery(String status){
        return reservationCrudRepository.CountByStatus(status);
    }

    public List<Client> getReportTopClients(){
        List<Client> clients = new ArrayList<Client>();
        List<Object[]> topClients = reservationCrudRepository.OrderedByCompleted();
        Client clientTop;
        Integer idClient;

        for (Object[] client : topClients) {
            idClient = (Integer) client[0];
            clientTop = clientRepository.getClient(idClient);
            clients.add(clientTop);
        }
        return clients;
    }
}