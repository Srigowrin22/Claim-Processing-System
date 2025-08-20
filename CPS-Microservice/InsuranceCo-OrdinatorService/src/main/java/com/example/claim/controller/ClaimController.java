package com.example.claim.controller;

import com.example.claim.model.Claim;
import com.example.claim.service.ClaimService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/claims")
@CrossOrigin(origins = "http://localhost:5173")
public class ClaimController {

    private final ClaimService service;

    public ClaimController(ClaimService service) {
        this.service = service;
    }

    @GetMapping("/getAll")
    public List<Claim> getAllClaims() {
        return service.getAllClaims();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Claim> getClaimById(@PathVariable Integer id) {
        return service.getClaimById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public Claim createClaim(@RequestBody Claim claim) {
        return service.createClaim(claim);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Claim> updateClaim(@PathVariable Integer id, @RequestBody Claim updatedClaim) {
        return service.updateClaim(id, updatedClaim)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClaim(@PathVariable Integer id) {
        boolean deleted = service.deleteClaim(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
