package traning.iqgateway.serviceImpl;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import traning.iqgateway.entities.ClaimsEO;
import traning.iqgateway.entities.DocumentsDTO;
import traning.iqgateway.repository.ClaimsRepository;
import traning.iqgateway.repository.CustomerRepository;
import traning.iqgateway.service.ClaimsService;

@Service
public class ClaimsServiceImpl implements ClaimsService {

	private static final Logger log = LoggerFactory.getLogger(ClaimsServiceImpl.class);

	@Autowired
	private ClaimsRepository claimsRepository;

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private RestTemplate restTemplate;

	private final String DOCUMENTS_SERVICE_NAME = "http://localhost:9096/documents";

	@Override
	public List<ClaimsEO> getClaimsByCustomerId(Integer customerId) {
		return claimsRepository.findAll().stream()
				.filter(c -> c.getCustomerId() != null && c.getCustomerId().equals(customerId)).toList();
	}
	
	@Transactional
    @Override
    public ClaimsEO saveClaimWithGeneratedId(ClaimsEO claim) {
        if (claim == null) {
            throw new IllegalArgumentException("Claim must not be null");
        }

        // Generate new claim ID as max existing ID + 1
        Integer maxClaimId = claimsRepository.findTopByOrderByIdDesc()
                .map(ClaimsEO::getId)
                .orElse(3000);  // default starting id

        claim.setId(maxClaimId + 1);

        // Initialize defaults
        claim.setDocId(null);
        claim.setApprovedAmount(null);
        claim.setStatus("Raised By Customer");
        claim.setSubmittedDate(OffsetDateTime.now().toString());
        claim.setLastUpdatedDate(Instant.now());

        ClaimsEO savedClaim = claimsRepository.save(claim);
        log.info("Saved claim with generated id {}", savedClaim.getId());

        return savedClaim;
    }

	@Override
	public ClaimsEO addClaim(ClaimsEO claim) {

		Integer maxClaimId = claimsRepository.findTopByOrderByIdDesc().map(ClaimsEO::getId).orElse(3000);
		claim.setId(maxClaimId + 1);

		claim.setDocId(null);
		claim.setApprovedAmount(null);
		claim.setStatus("Raised By Customer");
		claim.setSubmittedDate(OffsetDateTime.now().toString());
		claim.setLastUpdatedDate(Instant.now());

		ClaimsEO savedClaim = claimsRepository.save(claim);

		DocumentsDTO docDTO = new DocumentsDTO();
		docDTO.setClaimId(savedClaim.getId());
		docDTO.setBloodTest(null); // or retrieve dynamically
		docDTO.setAdmissionNote(null);
		docDTO.setPrescription(null);
		docDTO.setXrayReport(null);
		docDTO.setInsuranceForm(null);
		docDTO.setDischargeSummary(null);
		docDTO.setOther(null);
		docDTO.setLastUpdated(OffsetDateTime.now().toString());
		docDTO.setVerifiedBy(
				claim.getMedicalValid() != null && !claim.getMedicalValid().isEmpty() ? claim.getMedicalValid().get(0)
						: null);

		try {
			DocumentsDTO uploadedDoc = restTemplate.postForObject(DOCUMENTS_SERVICE_NAME + "/upload", docDTO,
					DocumentsDTO.class);

			if (uploadedDoc != null && uploadedDoc.getId() != null) {
				savedClaim.setDocId(uploadedDoc.getId());
				savedClaim.setDocument(uploadedDoc.getId());
				savedClaim = claimsRepository.save(savedClaim);
			}
		} catch (Exception e) {
			log.error("Document upload failed for claim ID {}: {}", savedClaim.getId(), e.getMessage());
			// optionally: throw or fallback
		}

		return savedClaim;
	}

	@Override
	public ClaimsEO updateClaim(Integer claimId, ClaimsEO claimUpdate) {
		ClaimsEO existingClaim = claimsRepository.findById(claimId)
				.orElseThrow(() -> new RuntimeException("Claim not found with id: " + claimId));

		if (claimUpdate.getDocId() != null) {
			existingClaim.setDocId(claimUpdate.getDocId());
		}

		existingClaim.setApprovedAmount(null);
		existingClaim.setStatus("Raised By Customer");

		existingClaim.setFeedback(claimUpdate.getFeedback());
		existingClaim.setMedicalValid(claimUpdate.getMedicalValid());
		existingClaim.setGivenPolicyId(claimUpdate.getGivenPolicyId());
		existingClaim.setHospitalId(claimUpdate.getHospitalId());
		existingClaim.setExpectedAmount(claimUpdate.getExpectedAmount());

		existingClaim.setLastUpdatedDate(Instant.now());

		return claimsRepository.save(existingClaim);
	}

	@Override
	public void deleteClaim(Integer claimId) {
		if (!claimsRepository.existsById(claimId)) {
			throw new RuntimeException("Claim not found with id: " + claimId);
		}
		claimsRepository.deleteById(claimId);
	}

	@Override
	public ClaimsEO addClaim(ClaimsEO claim, DocumentsDTO documents) {
		// TODO Auto-generated method stub
		return null;
	}
}
