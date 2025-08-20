package traning.iqgateway.service;

import java.util.List;

import traning.iqgateway.entities.ClaimsEO;
import traning.iqgateway.entities.DocumentsDTO;

public interface ClaimsService {

	List<ClaimsEO> getClaimsByCustomerId(Integer customerId);

	ClaimsEO addClaim(ClaimsEO claim);
	
    ClaimsEO addClaim(ClaimsEO claim, DocumentsDTO documents);

	ClaimsEO updateClaim(Integer claimId, ClaimsEO claimUpdate);

	void deleteClaim(Integer claimId);

	ClaimsEO saveClaimWithGeneratedId(ClaimsEO claim);
}