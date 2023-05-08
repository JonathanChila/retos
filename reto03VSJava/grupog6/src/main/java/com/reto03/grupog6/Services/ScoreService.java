package com.reto03.grupog6.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reto03.grupog6.Entities.Score;
import com.reto03.grupog6.Repository.ScoreRepository;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;
    
    public Score addScore(Score score) {
        Boolean flat = true;

        if(score.getResult() == null)
            flat = false;
        
        if(score.getDescription() == null)
            flat = false;

        if(score.getReservation().getIdReservation() == null)
            flat = false;
        
        if(flat)
            return scoreRepository.addScore(score);
        else
            return score;          
    }

    public List<Score> getAll() {
        return (List<Score>) scoreRepository.getAll();
    }

    public Score udpScore(Score score){
        return scoreRepository.updScore(score);
    }

    public Score getScore(Integer idScore){
        return scoreRepository.getScore(idScore);
    }

    public void delScore(Integer idScore){
        scoreRepository.deleteScore(idScore);
    }
}