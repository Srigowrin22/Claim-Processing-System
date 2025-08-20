package com.example.hospital.repository;

import com.example.hospital.model.Hospital;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HospitalRepository extends MongoRepository<Hospital, Integer> {
}
