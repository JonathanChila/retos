package com.reto03.grupog6.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog6.CrudRepository.ScoreCrudRepository;
import com.reto03.grupog6.Entities.Reservation;
import com.reto03.grupog6.Entities.Score;

@Repository
public class ScoreRepository {
    @Autowired
    private ScoreCrudRepository scoreCrudRepository;

    //save the entity in the database
    public Score addScore(Score score) {
        if (score.getIdScore() == null || score.getIdScore() == 0)
            return scoreCrudRepository.save(score);
        else
            return score;
    }

    //returns all the entities in the database
    public List<Score> getAll() {
        return (List<Score>) scoreCrudRepository.findAll();
    }

    //this method allows us to determine if the score exist or not in the database
    private Score existScore(Integer idScore) {
        Optional<Score> objScore = scoreCrudRepository.findById(idScore);
        Score objScoreReturn;

        if (objScore.isEmpty())
            objScoreReturn = null;
        else
            objScoreReturn = objScore.get();

        return objScoreReturn;
    }

    //Update the data of the entity identified
    public Score updScore(Score score){
        Score objScore;
        Reservation reservation = new Reservation();

        objScore = existScore(score.getIdScore());
        if(objScore == null)
            return score;
        else{
            if (score.getResult() != null)
                objScore.setResult(score.getResult());

            if (score.getDescription() != null)
                objScore.setDescription(score.getDescription());
            
            if(score.getReservation().getIdReservation() != null ){
                reservation.setIdReservation(score.getReservation().getIdReservation());
                objScore.setReservation(reservation);
            }
             
            return scoreCrudRepository.save(objScore);  //revisar error del profe: no es error ya que update en el crud no existe, por eso se usa save.
        }
    }

    public void deleteScore(Integer idScore){
        Score objScore;

        objScore = existScore(idScore);
        if(objScore != null)
            scoreCrudRepository.delete(objScore);
    }

    public Score getScore(Integer idScore){
        Score objScore;

        objScore = existScore(idScore);
        if (objScore != null)
            return objScore;
        else
            return null;
    }

}