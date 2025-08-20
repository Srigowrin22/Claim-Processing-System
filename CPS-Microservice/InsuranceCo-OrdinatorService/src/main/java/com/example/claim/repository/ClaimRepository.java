package com.example.claim.repository;

import com.example.claim.model.Claim;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClaimRepository extends MongoRepository<Claim, Integer> {
}
