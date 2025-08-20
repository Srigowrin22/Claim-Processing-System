package training.iqgateway.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import training.iqgateway.controller.DocumentDTO;
import training.iqgateway.model.DocumentsEO;
import training.iqgateway.repositary.DocumentRepository;
import training.iqgateway.service.DocumentService;

@Service
public class DocumentServiceImpl implements DocumentService {
	
	@Autowired
	private DocumentRepository docRepo;
	
    private DocumentDTO mapToDto(DocumentsEO entity) {
        if (entity == null) return null;
        DocumentDTO dto = new DocumentDTO();
	    dto.setId(entity.get_id());
	    dto.setClaimId(entity.getClaimId());
	    dto.setBloodTest(entity.getBloodTest());
	    dto.setAdmissionNote(entity.getAdmissionNote());
	    dto.setPrescription(entity.getPrescription());
	    dto.setXrayReport(entity.getXrayReport());
	    dto.setInsuranceForm(entity.getInsuranceForm());
	    dto.setDischargeSummary(entity.getDischargeSummary());
	    dto.setOther(entity.getOther());
	    dto.setLastUpdated(entity.getLastUpdated());
	    dto.setVerifiedBy(entity.getVerifiedBy());

        return dto;
    }

	@Override
	public List<DocumentsEO> findAll() {
		return docRepo.findAll();
	}
	
	  @Override
	    public List<DocumentsEO> findByClaimId(Integer claimId) {
	        return docRepo.findByClaimId(claimId);
	    }

	@Override
	public Optional<DocumentsEO> findById(Integer _id) {
		return docRepo.findById(_id);
	}

	@Override
	public DocumentsEO save(DocumentsEO doc) {
		return docRepo.save(doc);
	}

	@Override
	public Optional<DocumentsEO> update(Integer id,DocumentsEO doc) {
		 Optional<DocumentsEO> existingOpt = docRepo.findById(id);
	        if (existingOpt.isPresent()) {
	            DocumentsEO existing = existingOpt.get();

	            existing.setClaimId(doc.getClaimId());
	            existing.setBloodTest(doc.getBloodTest());
	            existing.setAdmissionNote(doc.getAdmissionNote());
	            existing.setPrescription(doc.getPrescription());
	            existing.setXrayReport(doc.getXrayReport());
	            existing.setInsuranceForm(doc.getInsuranceForm());
	            existing.setDischargeSummary(doc.getDischargeSummary());
	            existing.setOther(doc.getOther());
	            existing.setLastUpdated(doc.getLastUpdated());
	            existing.setVerifiedBy(doc.getVerifiedBy());
	            
	            DocumentsEO saved = docRepo.save(existing);

	            return Optional.of(saved);
	        } else {
	            throw new RuntimeException("Document not found with id: " + id);
	        }
	}

	@Override
	public void DeleteById(Integer _id) {
		docRepo.deleteById(_id);

	}

}
