package com.example.claim.service;

import com.example.claim.model.Claim;
import com.example.claim.repository.ClaimRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClaimService {

    private final ClaimRepository repository;
    private final SequenceGeneratorService sequenceGenerator;
    public static final String CLAIM_SEQ = "claim_sequence";

    public ClaimService(ClaimRepository repository, SequenceGeneratorService sequenceGenerator) {
        this.repository = repository;
        this.sequenceGenerator = sequenceGenerator;
    }

    public List<Claim> getAllClaims() {
        return repository.findAll();
    }

    public Optional<Claim> getClaimById(Integer id) {
        return repository.findById(id);
    }

    public Claim createClaim(Claim claim) {
        // Generate new integer ID
        claim.setId(sequenceGenerator.generateSequence(CLAIM_SEQ));

        // Default timestamps
        claim.setLastUpdatedDate(LocalDateTime.now().toString());
        if (claim.getSubmittedDate() == null || claim.getSubmittedDate().isEmpty()) {
            claim.setSubmittedDate(LocalDateTime.now().toLocalDate().toString());
        }

        return repository.save(claim);
    }

    public Optional<Claim> updateClaim(Integer id, Claim updatedClaim) {
        return repository.findById(id).map(existing -> {
            existing.setCustomerId(updatedClaim.getCustomerId());
            existing.setHospitalId(updatedClaim.getHospitalId());
            existing.setDocId(updatedClaim.getDocId());
            existing.setExpectedAmount(updatedClaim.getExpectedAmount());
            existing.setApprovedAmount(updatedClaim.getApprovedAmount());
            existing.setSubmittedDate(updatedClaim.getSubmittedDate());
            existing.setStatus(updatedClaim.getStatus());
            existing.setFeedback(updatedClaim.getFeedback());
            existing.setDocument(updatedClaim.getDocument());
            existing.setMedicalValid(updatedClaim.getMedicalValid());
            existing.setGivenPolicyId(updatedClaim.getGivenPolicyId());
            existing.setLastUpdatedDate(LocalDateTime.now().toString());

            return repository.save(existing);
        });
    }

    public boolean deleteClaim(Integer id) {
        return repository.findById(id).map(c -> {
            repository.delete(c);
            return true;
        }).orElse(false);
    }
}
