package com.example.hospital.service;

import com.example.hospital.model.Hospital;
import com.example.hospital.repository.HospitalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    public HospitalService(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    // ✅ Get all hospitals (read-only)
    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    // ✅ Get hospital by ID
    public Hospital getHospitalById(Integer id) {
        return hospitalRepository.findById(id).orElse(null);
    }
}
