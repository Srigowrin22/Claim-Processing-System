package training.iqgateway.repositary;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import training.iqgateway.model.DocumentsEO;

@Repository
public interface DocumentRepository extends MongoRepository<DocumentsEO, Integer> {

	Optional<DocumentsEO> findTopByOrderByIdDesc();

    @Query("{ 'claim_id': ?0 }")
    List<DocumentsEO> findByClaimId(Integer claimId);


}
