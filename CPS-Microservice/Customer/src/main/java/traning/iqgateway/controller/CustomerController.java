package traning.iqgateway.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import traning.iqgateway.entities.ClaimWithDocumentsDTO;
import traning.iqgateway.entities.ClaimsEO;
import traning.iqgateway.entities.CoversEO;
import traning.iqgateway.entities.CustomerEO;
import traning.iqgateway.entities.DocumentsDTO;
import traning.iqgateway.entities.HospitalsEO;
import traning.iqgateway.entities.PoliciesEO;
import traning.iqgateway.service.ClaimsService;
import traning.iqgateway.service.CoversService;
import traning.iqgateway.service.CustomerService;
import traning.iqgateway.service.HospitalService;
import traning.iqgateway.service.PoliciesService;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private static final Logger log = LoggerFactory.getLogger(CustomerController.class);

    @Autowired
    private CustomerService customerService;

    @Autowired
    private PoliciesService policiesService;

    @Autowired
    private CoversService coverService;

    @Autowired
    private HospitalService hospitalService;

    @Autowired
    private ClaimsService claimsService;

    @Autowired
    private RestTemplate restTemplate;

    // Update this to your config: Either Eureka service name or localhost with port
    private final String DOCUMENTS_SERVICE_URL = "http://localhost:9096/documents";

    // --- Customer APIs ---

    @PostMapping("/addCustomer")
    public ResponseEntity<CustomerEO> createCustomer(@RequestBody CustomerEO customer) {
        CustomerEO createdCustomer = customerService.createCustomer(customer);
        return ResponseEntity.ok(createdCustomer);
    }

    @GetMapping("/allCustomer")
    public ResponseEntity<List<CustomerEO>> getAllCustomers() {
        List<CustomerEO> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/getCustomer/{id}")
    public ResponseEntity<CustomerEO> getCustomerById(@PathVariable Integer id) {
        return customerService.getCustomerById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("custid/{id}")
    public ResponseEntity<CustomerEO> updateCustomer(@PathVariable Integer id, @RequestBody CustomerEO customer) {
        try {
            CustomerEO updatedCustomer = customerService.updateCustomer(id, customer);
            return ResponseEntity.ok(updatedCustomer);
        } catch(RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Integer id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/login")
    public ResponseEntity<CustomerEO> login(@RequestParam String customer_email,
                                            @RequestParam String customer_password) {
        List<CustomerEO> customers = customerService.findByEmailAndPassword(customer_email, customer_password);
        if(customers.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(customers.get(0));
    }

    // --- Policies APIs ---

    @GetMapping("/allPolicies")
    public ResponseEntity<List<PoliciesEO>> getAllPolicies() {
        return ResponseEntity.ok(policiesService.getAllPolicies());
    }

    @GetMapping("/policies/{customerId}")
    public ResponseEntity<List<PoliciesEO>> getPoliciesByCustomerId(@PathVariable Integer customerId) {
        return ResponseEntity.ok(policiesService.getPoliciesByCustomerId(customerId));
    }

    // --- Covers APIs ---

    @GetMapping("/allCovers")
    public ResponseEntity<List<CoversEO>> getAllCovers() {
        return ResponseEntity.ok(coverService.getAllCovers());
    }

    @GetMapping("/covers/{customerId}")
    public ResponseEntity<List<CoversEO>> getCoversByCustomer(@PathVariable Integer customerId) {
        return ResponseEntity.ok(coverService.getCoversByCustomerId(customerId));
    }

    // --- Hospitals APIs ---

    @GetMapping("/allHospitals")
    public ResponseEntity<List<HospitalsEO>> getAllHospitals() {
        return ResponseEntity.ok(hospitalService.getAllHospitals());
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<HospitalsEO>> getHospitalsByCity(@PathVariable String city) {
        return ResponseEntity.ok(hospitalService.getHospitalsByCity(city));
    }

    // --- Claims APIs ---

    @GetMapping("/claims/{customerId}")
    public ResponseEntity<List<ClaimsEO>> getClaimsByCustomerId(@PathVariable Integer customerId) {
        List<ClaimsEO> claims = claimsService.getClaimsByCustomerId(customerId);
        if(claims.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(claims);
    }

    @PostMapping("/addClaims")
    public ResponseEntity<ClaimsEO> createClaim(@RequestBody ClaimsEO claim) {
        ClaimsEO savedClaim = claimsService.addClaim(claim);
        return ResponseEntity.ok(savedClaim);
    }

    @PutMapping("/{claimId}")
    public ResponseEntity<ClaimsEO> updateClaim(@PathVariable Integer claimId, @RequestBody ClaimsEO claimUpdate) {
        ClaimsEO updatedClaim = claimsService.updateClaim(claimId, claimUpdate);
        return ResponseEntity.ok(updatedClaim);
    }

    @DeleteMapping("claims/{claimId}")
    public ResponseEntity<Void> deleteClaim(@PathVariable Integer claimId) {
        claimsService.deleteClaim(claimId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/addClaimWithDocs")
    public ResponseEntity<?> addClaimWithDocs(@RequestBody ClaimWithDocumentsDTO payload) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonPayload = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(payload);
            System.err.println("Received ClaimWithDocumentsDTO JSON:\n" + jsonPayload);

            log.info("Received ClaimWithDocumentsDTO JSON:\n{}", jsonPayload);

        } catch (Exception e) {
            log.error("Failed to serialize ClaimWithDocumentsDTO", e);
        }

        if (payload == null || payload.getClaim() == null) {
            log.error("Claim part is null or payload invalid!");
            return ResponseEntity.badRequest().body("Claim data is required");
        }

        try {
            ClaimsEO savedClaim = claimsService.saveClaimWithGeneratedId(payload.getClaim());

            DocumentsDTO docs = payload.getDocuments();

            if (docs == null) {
                log.warn("No documents provided, skipping document upload");
                return ResponseEntity.ok(savedClaim);
            }

            docs.setClaimId(savedClaim.getId());
            docs.setId(null); // Clear document ID to trigger generation

            ResponseEntity<DocumentsDTO> documentResponse = restTemplate.postForEntity(
                DOCUMENTS_SERVICE_URL + "/upload",
                docs,
                DocumentsDTO.class);

            // Step 5: Validate document upload success
            if (!documentResponse.getStatusCode().is2xxSuccessful() || documentResponse.getBody() == null) {
                log.error("Document upload failed or returned null");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Document upload failed");
            }

            // Step 6: Get the generated document ID and update the claim
            DocumentsDTO savedDocument = documentResponse.getBody();
            savedClaim.setDocId(savedDocument.getId());
            ClaimsEO updatedClaim = claimsService.updateClaim(savedClaim.getId(), savedClaim);

            // Step 7: Return updated claim
            return ResponseEntity.ok(updatedClaim);

        } catch (Exception e) {
            log.error("Exception in addClaimWithDocs", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to add claim with documents");
        }
    }

    
    
    // --- Fetch all documents via Document Microservice ---

    @GetMapping("/allDocuments")
    public ResponseEntity<?> getAllDocuments() {
        try {
            ResponseEntity<List> response = restTemplate.getForEntity(DOCUMENTS_SERVICE_URL + "/getAll", List.class);
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch(Exception e){
            log.error("Failed to fetch documents from Document Microservice", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching documents");
        }
    }

}
