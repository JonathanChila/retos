package com.reto03.grupog6.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reto03.grupog6.DTO.ClientsReport;
import com.reto03.grupog6.DTO.StatusReport;
import com.reto03.grupog6.Entities.Reservation;
import com.reto03.grupog6.Services.ReservationService;

@RestController
@RequestMapping("/api/Reservation")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all")
    public List<Reservation> getAll() {
        return reservationService.getAll();
    }
    
    @GetMapping("/{id}")
    public Reservation getReservation(@PathVariable Integer id) {
        return reservationService.getReservation(id);
    }

    //this is for challenge 5
    @GetMapping("report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getReportReservation(@PathVariable("dateOne") String dateOne, 
                                                    @PathVariable("dateTwo") String dateTwo) {
        return reservationService.getReportReservations(dateOne, dateTwo);
    }

    //this is the first form to get the status reservations. this for challenge 5
    @GetMapping("/report-status")
    public StatusReport getReportStatus(){
        return reservationService.getStatusReport();
    }

    //this is the second form to get report of status reservation with sql query
    @GetMapping("/report-status-query")
    public StatusReport getStatusReportQuery(){
        return reservationService.getStatusReportQuery();
    }

    //this is for challenge 5
    @GetMapping("/report-clients")
    public List<ClientsReport> getClientsReport(){
        return reservationService.getClientsReport();
    }
    

    @PostMapping("/save")
    public Reservation addReservation(@RequestBody Reservation reservation) {
        return reservationService.addReservation(reservation);
    }

    @PutMapping("/update")
    public Reservation updateReservation(@RequestBody Reservation reservation) {
        return reservationService.udpReservation(reservation);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Integer id) {
        reservationService.delReservation(id);
    }

}