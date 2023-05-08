package com.reto03.grupog6.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog6.CrudRepository.CarCrudRepository;
import com.reto03.grupog6.Entities.Car;

@Repository
public class CarRepository {
    @Autowired
    private CarCrudRepository carCrudRepository;

    //save the entity in the database
    public Car addCar(Car car) {
        if (car.getIdCar() == null || car.getIdCar() == 0)
            return carCrudRepository.save(car);
        else
            return car;
    }

    //returns all the entities in the database
    public List<Car> getAll() {
        return (List<Car>) carCrudRepository.findAll();
    }

    //this method allows us to determine if the car exist or not in the database
    private Car existCar(Integer idCar) {
        Optional<Car> objCar = carCrudRepository.findById(idCar);
        Car objCarReturn;

        if (objCar.isEmpty())
            objCarReturn = null;
        else
            objCarReturn = objCar.get();

        return objCarReturn;
    }

    //Update the data of the entity identified
    public Car updCar(Car car){
        Car objCar;

        objCar = existCar(car.getIdCar());
        if(objCar == null)
            return car;
        else{
            if (car.getName() != null)
                objCar.setName(car.getName());

            if (car.getBrand() != null)
                objCar.setBrand(car.getBrand());
        
            if (car.getYear() != null)
                objCar.setYear(car.getYear());

            if (car.getDescription() != null)
                objCar.setDescription(car.getDescription());

            return carCrudRepository.save(objCar); //revisar error del profe: no es error ya que update en el crud no existe, por eso se usa save.
        }

    }

    public void deleteCar(Integer idCar){
        Car objCar;

        objCar = existCar(idCar);
        if(objCar != null)
            carCrudRepository.delete(objCar);
    }

    public Car getCar(Integer idCar){
        Car objCar;

        objCar = existCar(idCar);
        if (objCar != null)
            return objCar;
        else
            return null;
    }
}