package com.acds.inventory_management_system.controller;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

@Controller
public class WebController {
//    LANDING PAGE HERE
    @RequestMapping("/")
    public String index(){
        return "index";
    }
    @RequestMapping("/login")
    public String login(){
        return "login";
    }
    @RequestMapping("/register")
    public String register(){
        return "register";
    }
    @RequestMapping("/userManagement")
    public String userManagement(){
        return "user-management";
    }
    @RequestMapping(value="/dashboard")
    public String dashboard(){
        return "dashboard";
    }
    @RequestMapping(value="/inventory")
    public String inventory(){
        return "inventory";
    }
    @RequestMapping(value="/sale")
    public String sale(){
        return "sale";
    }
    @RequestMapping(value="/purchase")
    public String purchase(){
        return "purchase";
    }

//    NOT YET IMPLEMENTED
//    @RequestMapping(value="/supplier")
//    public String supplier(){
//        return "inventory";
//    }
//  NOT YET
//    @RequestMapping(value="/setting")
//    public String setting(){
//        return "setting";
//    }
}
