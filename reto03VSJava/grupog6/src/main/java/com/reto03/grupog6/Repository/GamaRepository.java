package com.reto03.grupog6.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog6.CrudRepository.GamaCrudRepository;
import com.reto03.grupog6.Entities.Gama;

@Repository
public class GamaRepository {
    @Autowired
    private GamaCrudRepository gamaCrudRepository;

    //save the entity in the database
    public Gama addGama(Gama gama) {
        if (gama.getIdGama() == null || gama.getIdGama() == 0)
            return gamaCrudRepository.save(gama);
        else
            return gama;
    }

    //returns all the entities in the database
    public List<Gama> getAll() {
        return (List<Gama>) gamaCrudRepository.findAll();
    }

    //this method allows us to determine if the gama exist or not in the database
    private Gama existGama(Integer idGama) {
        Optional<Gama> objGama = gamaCrudRepository.findById(idGama);
        Gama objGamaReturn;

        if (objGama.isEmpty())
            objGamaReturn = null;
        else
            objGamaReturn = objGama.get();

        return objGamaReturn;
    }

    //Update the data of the entity identified
    public Gama updGama(Gama gama){
        Gama objGama;

        objGama = existGama(gama.getIdGama());
        if(objGama == null)
            return gama;
        else {
            if (gama.getName() != null)
                objGama.setName(gama.getName());

            if (gama.getDescription() != null)
                objGama.setDescription(gama.getDescription());
                
            return gamaCrudRepository.save(objGama);  //revisar error del profe: no es error ya que update en el crud no existe, por eso se usa save.
        }
    }

    public void deleteGama(Integer idGama){
        Gama objGama;

        objGama = existGama(idGama);
        if(objGama != null)
            gamaCrudRepository.delete(objGama);
    }

    public Gama getGama(Integer idGama){
        // return existGama(idGama);
        Gama objGama;

        objGama = existGama(idGama);
        if (objGama != null)
            return objGama;
        else
            return null;
    }
}