package com.cps.InsuranceCordinator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(
    scanBasePackages = {
        "com.cps.InsuranceCordinator",   // ✅ Main base package
        "com.example.preauth",           // ✅ PreAuthorization package
        "com.example.hospital",          // ✅ Hospital package
        "com.example.claim"              // ✅ Claims package
    }
)
@EnableMongoRepositories(
    basePackages = {
        "com.example.preauth.repository",   // ✅ PreAuthorization Repos
        "com.example.hospital.repository",  // ✅ Hospital Repos
        "com.example.claim.repository"      // ✅ Claims Repos
    }
)
public class InsuranceCoOrdinatorServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InsuranceCoOrdinatorServiceApplication.class, args);
    }
}
