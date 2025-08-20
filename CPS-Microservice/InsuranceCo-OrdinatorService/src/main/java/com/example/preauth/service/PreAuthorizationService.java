package com.example.preauth.service;

import com.example.preauth.model.PreAuthorization;
import com.example.preauth.repository.PreAuthorizationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PreAuthorizationService {

    private final PreAuthorizationRepository repository;

    public PreAuthorizationService(PreAuthorizationRepository repository) {
        this.repository = repository;
    }

    // ✅ Fetch all policies
    public List<PreAuthorization> getAllPolicies() {
        return repository.findAll();
    }

    // ✅ Fetch policy by cardNumber (NOT _id)
    public Optional<PreAuthorization> getPolicyByCardNumber(String cardNumber) {
        return repository.findByCardNumber(cardNumber);
    }
}
