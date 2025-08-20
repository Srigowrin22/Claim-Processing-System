package traning.iqgateway.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import traning.iqgateway.entities.ClaimWithDocsDTO;
import traning.iqgateway.entities.ClaimsEO;
import traning.iqgateway.entities.DocumentsEO;
import traning.iqgateway.entities.UserEO;
import traning.iqgateway.service.ClaimsService;
import traning.iqgateway.service.CustomerService;
import traning.iqgateway.service.HospitalService;
import traning.iqgateway.service.PolicyService;
import traning.iqgateway.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/head")
public class RegionalHeadController {

	@Autowired
	private ClaimsService claimsService;

	@Autowired
	private PolicyService policyService;

	@Autowired
	private HospitalService hospitalService;

	@Autowired
	private CustomerService customerService;

	@Autowired
	private UserService userService;

	@Autowired
	private RestTemplate restTemplate;

	@GetMapping("/forwarded")
	public ResponseEntity<List<ClaimWithDocsDTO>> getForwardedClaimsWithDocs() {
		List<ClaimWithDocsDTO> claimsWithDocs = claimsService.getClaimsWithDocumentsByStatus("Forwarded");
		if (claimsWithDocs.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(claimsWithDocs);
	}

	@GetMapping("/rejected")
	public ResponseEntity<List<ClaimsEO>> getRejectedClaims() {
		List<ClaimsEO> rejectedClaims = claimsService.getClaimsByStatus("Rejected");
		if (rejectedClaims.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(rejectedClaims);
	}

	@GetMapping("/approved")
	public ResponseEntity<List<ClaimsEO>> getApprovedClaims() {
		List<ClaimsEO> approvedClaims = claimsService.getClaimsByStatus("Approved");
		if (approvedClaims.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(approvedClaims);
	}

	// 2) Update Claims status
	@PatchMapping("/{claimId}/status")
	public ResponseEntity<ClaimsEO> updateClaimStatus(@PathVariable Integer claimId, @RequestParam String status) {
		try {
			ClaimsEO updatedClaim = claimsService.updateClaimStatus(claimId, status);
			return ResponseEntity.ok(updatedClaim);
		} catch (RuntimeException ex) {
			return ResponseEntity.notFound().build();
		}
	}

//	------------------- User -------------------
	@GetMapping("getUser/{id}")
	public ResponseEntity<UserEO> getUserById(@PathVariable Integer id) {
		UserEO user = userService.getUserById(id);
		if (user == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(user);
	}

	@PutMapping("/updateIsActive/{id}")
	public ResponseEntity<UserEO> updateUser(@PathVariable Integer id, @RequestBody UserEO userUpdate) {
		UserEO existing = userService.getUserById(id);
		if (existing == null) {
			return ResponseEntity.notFound().build();
		}
		Boolean newActive = userUpdate.getIsActive();
		if (newActive != null) {
			existing.setIsActive(newActive);
		}
		UserEO updatedUser = userService.updateIsActive(id, existing.getIsActive());
		return ResponseEntity.ok(updatedUser);
	}

//	------------------- Claim -------------------

	@GetMapping("/getAllClaims")
	public ResponseEntity<List<ClaimsEO>> getAllClaims() {
		List<ClaimsEO> allClaims = claimsService.getAllClaims();
		if (allClaims.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(allClaims);
	}

	@GetMapping
	public ResponseEntity<Map<String, Long>> getClaimsCounts() {
		Map<String, Long> response = new HashMap<>();
		response.put("forwarded", claimsService.countForwardedClaims());
		response.put("approved", claimsService.countApprovedClaims());
		response.put("rejected", claimsService.countRejectedClaims());
		return ResponseEntity.ok(response);
	}

	@GetMapping("/countForwarded")
	public ResponseEntity<Long> getForwardedCount() {
		return ResponseEntity.ok(claimsService.countForwardedClaims());
	}

	@GetMapping("/countApproved")
	public ResponseEntity<Long> getApprovedCount() {
		return ResponseEntity.ok(claimsService.countApprovedClaims());
	}

	@GetMapping("/countRejected")
	public ResponseEntity<Long> getRejectedCount() {
		return ResponseEntity.ok(claimsService.countRejectedClaims());
	}

	@GetMapping("/countClaims")
	public ResponseEntity<Long> getClaimsCount() {
		long count = claimsService.getClaimsCount();
		return ResponseEntity.ok(count);
	}

//	------------------- Policy -------------------

	@GetMapping("/countPolicy")
	public ResponseEntity<Long> getPolicyCount() {
		long count = policyService.getPolicyCount();
		return ResponseEntity.ok(count);
	}

//	------------------- Hospital -------------------

	@GetMapping("/countHospital")
	public ResponseEntity<Long> getHospitalCount() {
		long count = hospitalService.getHospitalCount();
		return ResponseEntity.ok(count);
	}

//	------------------- Customer -------------------

	@GetMapping("/countCustomer")
	public ResponseEntity<Long> getCustomerCount() {
		long count = customerService.getCustomerCount();
		return ResponseEntity.ok(count);
	}
}
