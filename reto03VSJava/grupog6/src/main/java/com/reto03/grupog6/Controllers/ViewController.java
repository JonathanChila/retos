package com.reto03.grupog6.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ViewController {
    @GetMapping("/")
    public String index(){
        return "index";
    }
}
