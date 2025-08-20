package traning.iqgateway.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import traning.iqgateway.entities.UserEO;

@Repository
public interface UserRepository extends MongoRepository<UserEO, Integer> {
}
