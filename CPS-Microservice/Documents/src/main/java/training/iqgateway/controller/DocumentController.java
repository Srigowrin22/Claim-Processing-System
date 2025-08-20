package training.iqgateway.controller;

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
import org.springframework.web.bind.annotation.RestController;

import training.iqgateway.model.DocumentMapper;
import training.iqgateway.model.DocumentsDTO;
import training.iqgateway.model.DocumentsEO;
import training.iqgateway.service.DocumentService;

@RestController
@RequestMapping("/documents")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentController {

	@Autowired
	private DocumentService docSer;

	private static final Logger log = LoggerFactory.getLogger(DocumentController.class);

	@GetMapping("/getAll")
	public ResponseEntity<List<DocumentsEO>> getAllDocs() {
		List<DocumentsEO> docs = docSer.findAll();
		if (docs.isEmpty()) {
			log.info("No documents found");
			return ResponseEntity.noContent().build();
		}
		log.info("Returning {} documents", docs.size());
		return ResponseEntity.ok(docs);
	}

	@GetMapping("/{_id}")
	public ResponseEntity<DocumentsEO> getById(@PathVariable Integer _id) {
		return docSer.findById(_id).map(doc -> {
			log.info("Found document with id {}", _id);
			return ResponseEntity.ok(doc);
		}).orElseGet(() -> {
			log.warn("No document found with id {}", _id);
			return ResponseEntity.notFound().build();
		});
	}

	@PostMapping("/upload")
	public ResponseEntity<DocumentsDTO> createDocument(@RequestBody DocumentsDTO docsDTO) {
		// Check for null document
		if (docsDTO == null) {
			log.warn("Received null DocumentsDTO, cannot proceed.");
			return ResponseEntity.badRequest().body(null);
		}

		log.info("===== Received Document DTO for upload =====");
		log.info("DocumentsDTO: {}", docsDTO);

		// Log admission note and insurance form specifically
		if (docsDTO.getAdmissionNote() != null) {
			log.info("Admission Note keys: {}", docsDTO.getAdmissionNote().keySet());
			log.info("Admission Note base64 content (truncated): {}",
					docsDTO.getAdmissionNote().getOrDefault("base64", "null").substring(0,
							Math.min(30, docsDTO.getAdmissionNote().get("base64").length())) + "...");
		} else {
			log.warn("Admission Note is null");
		}

		if (docsDTO.getInsuranceForm() != null) {
			log.info("Insurance Form keys: {}", docsDTO.getInsuranceForm().keySet());
			log.info("Insurance Form base64 content (truncated): {}",
					docsDTO.getInsuranceForm().getOrDefault("base64", "null").substring(0,
							Math.min(30, docsDTO.getInsuranceForm().get("base64").length())) + "...");
		} else {
			log.warn("Insurance Form is null");
		}

		// Convert DTO -> EO
		DocumentsEO docsEO = DocumentMapper.convertDTOToEO(docsDTO);
		log.info("Converted documentsEO (partial): ClaimId={}, AdmissionNoteKeys={}", docsEO.getClaimId(),
				docsEO.getAdmissionNote() != null ? docsEO.getAdmissionNote().keySet() : "null");

		// Generate new ID for MongoDB
		Integer maxId = docSer.findMaxId().orElse(0);
		docsEO.setId(maxId + 1);
		docsDTO.setId(docsEO.getId()); // Reflect new ID back in DTO

		// Save to MongoDB
		DocumentsEO saved = docSer.save(docsEO);
		log.info("Saved document with ID: {}", saved.getId());

		// Return saved DTO
		return ResponseEntity.status(HttpStatus.CREATED).body(docsDTO);
	}

	@PutMapping("/{_id}")
	public ResponseEntity<DocumentsEO> updateDocument(@PathVariable Integer _id, @RequestBody DocumentsEO doc) {
		return docSer.update(_id, doc).map(updatedDoc -> {
			log.info("Updated document id {}", _id);
			return ResponseEntity.ok(updatedDoc);
		}).orElseGet(() -> {
			log.warn("No document found to update for id {}", _id);
			return ResponseEntity.notFound().build();
		});
	}

	@DeleteMapping("/delete/{_id}")
	public ResponseEntity<Void> deleteDocument(@PathVariable Integer _id) {
		if (docSer.findById(_id).isEmpty()) {
			log.warn("No document found to delete for id {}", _id);
			return ResponseEntity.notFound().build();
		}
		docSer.DeleteById(_id);
		log.info("Deleted document with id {}", _id);
		return ResponseEntity.noContent().build();
	}

	
	@GetMapping("/claims/{claimId}")
	public ResponseEntity<List<DocumentsEO>> getDocumentsByClaimId(@PathVariable Integer claimId) {
	    List<DocumentsEO> docs = docSer.findByClaimId(claimId);
	    if (docs.isEmpty()) {
	        System.out.println("No docs found for claimId " + claimId);
	        return ResponseEntity.noContent().build();
	    }

	    System.out.println("Found " + docs.size() + " document(s) for claimId: " + claimId);
	    return ResponseEntity.ok(docs);
	}

}
