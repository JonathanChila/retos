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
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.reto03.grupog6.Entities.Score;
import com.reto03.grupog6.Services.ScoreService;

@RestController
@RequestMapping("/api/Score")
public class ScoreController {
    @Autowired
    private ScoreService scoreService;

    @GetMapping("/all")
    public List<Score> getAll() {
        return scoreService.getAll();
    }
    
    @GetMapping("/{id}")
    public Score getScore(@PathVariable Integer id) {
        return scoreService.getScore(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Score addScore(@RequestBody Score score) {
        return scoreService.addScore(score);
    }

    @PutMapping("/update")
    public Score updateScore(@RequestBody Score score) {
        return scoreService.udpScore(score);
    }

    @DeleteMapping("/{id}")
    public void deleteScore(@PathVariable Integer id) {
        scoreService.delScore(id);
    }
    
    
}