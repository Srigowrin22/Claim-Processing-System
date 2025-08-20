package training.iqgateway.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import training.iqgateway.model.DocumentsEO;


public interface DocumentService {
	
	List<DocumentsEO> findAll();
	
	List<DocumentsEO> findByClaimId(Integer claimId);
	
	Optional<DocumentsEO> findById(Integer _id);
	
	DocumentsEO save(DocumentsEO doc);
	
	Optional<DocumentsEO> update(Integer id,DocumentsEO doc);
	
	void DeleteById(Integer _id);
		
	

}
