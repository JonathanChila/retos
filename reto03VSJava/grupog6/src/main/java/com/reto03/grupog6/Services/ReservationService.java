package com.reto03.grupog6.Services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reto03.grupog6.DTO.ClientsReport;
import com.reto03.grupog6.DTO.StatusReport;
import com.reto03.grupog6.Entities.Client;
import com.reto03.grupog6.Entities.Reservation;
import com.reto03.grupog6.Repository.ReservationRepository;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation addReservation(Reservation reservation) {
        Boolean flat = true;

        if (reservation.getStartDate() == null)
            flat = false;

        if (reservation.getDevolutionDate() == null)
            flat = false;

        if (reservation.getClient().getIdClient() == null)
            flat = false;

        if (reservation.getCar().getIdCar() == null)
            flat = false;

        if (reservation.getStatus() == null) {
            reservation.setStatus("created");
        }

        if (flat)
            return reservationRepository.addReservation(reservation);
        else
            return reservation;
    }

    public List<Reservation> getAll() {
        return (List<Reservation>) reservationRepository.getAll();
    }

    public Reservation udpReservation(Reservation reservation) {
        return reservationRepository.updReservation(reservation);
    }

    public Reservation getReservation(Integer idReservation) {
        return reservationRepository.getReservation(idReservation);
    }

    public void delReservation(Integer idReservation) {
        reservationRepository.deleteReservation(idReservation);
    }

    public List<Reservation> getReportReservations(String dateOne, String dateTwo) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date dOne = new Date();
        Date dTwo = new Date();

        try {
            dOne = dateFormat.parse(dateOne);
            dTwo = dateFormat.parse(dateTwo);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (dOne.before(dTwo)) {
            return reservationRepository.getReportReservations(dOne, dTwo);
        } else {
            return new ArrayList<>();
        }
    }

    // this is one form to get the status of a reservation; the other one is with SQL queries
    public StatusReport getStatusReport() {
        List<Reservation> listReservations = reservationRepository.getAll();
        StatusReport statusReport = new StatusReport();
        Integer cancelled = 0;
        Integer completed = 0;

        for (Reservation reservation : listReservations){
            if(reservation.getStatus().equalsIgnoreCase("completed"))
                completed++;
            if(reservation.getStatus().equalsIgnoreCase("cancelled"))
                cancelled++;
        }
        statusReport.setCompleted(completed);
        statusReport.setCancelled(cancelled);
        return statusReport;
    }

    // this is one form to get the status of a reservation; the other one is with SQL queries
    public StatusReport getStatusReportQuery() {
        StatusReport statusReport = new StatusReport();
        Integer cancelled = reservationRepository.getReportStatusByQuery("cancelled");
        Integer completed = reservationRepository.getReportStatusByQuery("completed");

        statusReport.setCompleted(completed);
        statusReport.setCancelled(cancelled);
        return statusReport;
    }


    public List<ClientsReport> getClientsReport() {
        List<Client> clients;
        List<ClientsReport> clientsReport = new ArrayList<ClientsReport>();
        Integer total;

        clients = reservationRepository.getReportTopClients();
        for (Client client : clients) {
            total = client.getReservations().size();
            clientsReport.add(new ClientsReport(total,client));
        }
        return clientsReport;
    }
}