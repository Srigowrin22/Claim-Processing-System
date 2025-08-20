package traning.iqgateway.service;

import java.util.List;

import traning.iqgateway.entities.ClaimWithDocsDTO;
import traning.iqgateway.entities.ClaimsEO;

public interface ClaimsService {

	List<ClaimWithDocsDTO> getClaimsWithDocumentsByStatus(String status);

	List<ClaimsEO> getClaimsByStatus(String status);

	ClaimsEO updateClaimStatus(Integer claimId, String newStatus);

	long countForwardedClaims();

	long countApprovedClaims();

	long countRejectedClaims();

	long getClaimsCount();

	List<ClaimsEO> getAllClaims();
}