package traning.iqgateway.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import traning.iqgateway.entities.HospitalEO;

@Repository
public interface HospitalRepository extends MongoRepository<HospitalEO, Integer> {
}
