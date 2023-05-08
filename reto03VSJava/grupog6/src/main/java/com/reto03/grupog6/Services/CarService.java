package com.reto03.grupog6.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reto03.grupog6.Entities.Car;
import com.reto03.grupog6.Repository.CarRepository;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;
    
    public Car addCar(Car car) {
        Boolean flat = true;

        if(car.getName() == null)
            flat = false;
        
        if(car.getBrand() == null)
            flat = false;
        
        if(car.getYear() == null)
            flat = false;
        
        if(car.getDescription() == null)
            flat = false;

        // if(car.getGama().getIdGama() == null)
        //     flat = false;
        
        if(flat)
            return carRepository.addCar(car);
        else
            return car;          
    }

    public List<Car> getAll() {
        return (List<Car>) carRepository.getAll();
    }

    public Car udpCar(Car car){
        return carRepository.updCar(car);
    }

    public Car getCar(Integer idCar){
        return carRepository.getCar(idCar);
    }

    public void delCar(Integer idCar){
        carRepository.deleteCar(idCar);
    }
}