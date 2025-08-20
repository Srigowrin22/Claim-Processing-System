package com.example.preauth.controller;

import com.example.preauth.model.PreAuthorization;
import com.example.preauth.service.PreAuthorizationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/preAuthorization")
@CrossOrigin(origins = "http://localhost:5173")

public class PreAuthorizationController {

    private final PreAuthorizationService service;

    public PreAuthorizationController(PreAuthorizationService service) {
        this.service = service;
    }

    // ✅ Get all policies
    @GetMapping
    public List<PreAuthorization> getAll() {
        return service.getAllPolicies();
    }

    // ✅ Get policy by health card number
    @GetMapping("/{cardNumber}")
    public PreAuthorization getByCardNumber(@PathVariable String cardNumber) {
        return service.getPolicyByCardNumber(cardNumber)
                .orElse(null); // return null if not found
    }
}
