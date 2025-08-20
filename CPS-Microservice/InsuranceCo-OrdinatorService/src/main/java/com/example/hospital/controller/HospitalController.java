package com.example.hospital.controller;

import com.example.hospital.model.Hospital;
import com.example.hospital.service.HospitalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hospitals")
public class HospitalController {

    private final HospitalService hospitalService;

    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    // ✅ 1. Get all hospitals (dropdown list)
    @GetMapping
    public List<Hospital> getAllHospitals() {
        return hospitalService.getAllHospitals();
    }

    // ✅ 2. Get hospital by ID
    @GetMapping("/{id}")
    public Hospital getHospitalById(@PathVariable Integer id) {
        return hospitalService.getHospitalById(id);
    }
}
