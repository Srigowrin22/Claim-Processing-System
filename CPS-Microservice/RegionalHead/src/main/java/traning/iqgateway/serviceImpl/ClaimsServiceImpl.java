package traning.iqgateway.serviceImpl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import traning.iqgateway.entities.ClaimWithDocsDTO;
import traning.iqgateway.entities.ClaimsEO;
import traning.iqgateway.entities.DocumentsEO;
import traning.iqgateway.repository.ClaimsRepository;
import traning.iqgateway.service.ClaimsService;

@Service
public class ClaimsServiceImpl implements ClaimsService {

	@Autowired
	private ClaimsRepository claimsRepository;

	@Autowired
	private RestTemplate restTemplate; // Injected RestTemplate bean (@LoadBalanced)

	private final String DOCUMENTS_SERVICE_URL = "http://localhost:9096/documents/claims";

	@Override
	public List<ClaimWithDocsDTO> getClaimsWithDocumentsByStatus(String status) {
		List<ClaimsEO> claimsList = claimsRepository.findByStatus(status);
		List<ClaimWithDocsDTO> result = new ArrayList<>();

		for (ClaimsEO claim : claimsList) {
			List<DocumentsEO> docs = Collections.emptyList();
			try {
				String url = DOCUMENTS_SERVICE_URL + "/" + claim.getId();

				ResponseEntity<List<DocumentsEO>> response = restTemplate.exchange(url, HttpMethod.GET, null,
						new ParameterizedTypeReference<List<DocumentsEO>>() {
						});

				if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
					docs = response.getBody();
				}
			} catch (Exception ex) {
				System.err.println("Failed to fetch documents for claim id " + claim.getId() + ": " + ex.getMessage());
			}

			result.add(new ClaimWithDocsDTO(claim, docs));
		}

		return result;
	}

	@Override
	public List<ClaimsEO> getClaimsByStatus(String status) {
		return claimsRepository.findByStatus(status);
	}

	public ClaimsEO updateClaimStatus(Integer claimId, String newStatus) {
		Optional<ClaimsEO> optClaim = claimsRepository.findById(claimId);
		if (optClaim.isEmpty()) {
			throw new RuntimeException("Claim not found for id: " + claimId);
		}
		ClaimsEO claim = optClaim.get();
		claim.setStatus(newStatus);
		claim.setLastUpdatedDate(java.time.Instant.now());
		return claimsRepository.save(claim);
	}
	
	 @Override
	    public List<ClaimsEO> getAllClaims() {
	        return claimsRepository.findAll();
	    }

	@Override
	public long countForwardedClaims() {
		return claimsRepository.countByStatus("Forwarded");
	}

	@Override
	public long countApprovedClaims() {
		return claimsRepository.countByStatus("Approved");
	}

	@Override
	public long countRejectedClaims() {
		return claimsRepository.countByStatus("Rejected");
	}

	@Override
	public long getClaimsCount() {
		return claimsRepository.count();

	}

}
