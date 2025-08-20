package traning.iqgateway.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import traning.iqgateway.entities.CustomerEO;

@Repository
public interface CustomerRepository extends MongoRepository<CustomerEO, Integer> {
    // ✨ count() is already built-in by Spring Data
}
