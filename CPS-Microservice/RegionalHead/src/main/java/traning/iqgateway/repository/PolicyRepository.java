package traning.iqgateway.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import traning.iqgateway.entities.PolicyEO;

@Repository
public interface PolicyRepository extends MongoRepository<PolicyEO, Integer> {
}
