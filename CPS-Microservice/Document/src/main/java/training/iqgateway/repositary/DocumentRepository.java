package training.iqgateway.repositary;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import training.iqgateway.model.DocumentsEO;

@Repository
public interface DocumentRepository extends MongoRepository<DocumentsEO,Integer> {
	
	 List<DocumentsEO> findByClaimId(Integer claimId);

}
