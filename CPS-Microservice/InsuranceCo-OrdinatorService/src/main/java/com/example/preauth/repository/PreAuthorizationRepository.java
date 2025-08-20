package com.example.preauth.repository;

import com.example.preauth.model.PreAuthorization;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface PreAuthorizationRepository extends MongoRepository<PreAuthorization, String> {

    // ✅ Find by cardNumber directly (NOT _id)
    Optional<PreAuthorization> findByCardNumber(String cardNumber);
}
