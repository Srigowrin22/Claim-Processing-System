package training.iqgateway.model;

public class DocumentMapper {

    public static DocumentsEO convertDTOToEO(DocumentsDTO dto) {
        DocumentsEO eo = new DocumentsEO();
        eo.setId(dto.getId());
        eo.setClaimId(dto.getClaimId());
        eo.setBloodTest(dto.getBloodTest());
        eo.setAdmissionNote(dto.getAdmissionNote());
        eo.setPrescription(dto.getPrescription());
        eo.setXrayReport(dto.getXrayReport());
        eo.setInsuranceForm(dto.getInsuranceForm());
        eo.setDischargeSummary(dto.getDischargeSummary());
        eo.setOther(dto.getOther());
        eo.setLastUpdated(dto.getLastUpdated());
        eo.setVerifiedBy(dto.getVerifiedBy());
        return eo;
    }

    public static DocumentsDTO convertEOToDTO(DocumentsEO eo) {
        DocumentsDTO dto = new DocumentsDTO();
        dto.setId(eo.getId());
        dto.setClaimId(eo.getClaimId());
        dto.setBloodTest(eo.getBloodTest());
        dto.setAdmissionNote(eo.getAdmissionNote());
        dto.setPrescription(eo.getPrescription());
        dto.setXrayReport(eo.getXrayReport());
        dto.setInsuranceForm(eo.getInsuranceForm());
        dto.setDischargeSummary(eo.getDischargeSummary());
        dto.setOther(eo.getOther());
        dto.setLastUpdated(eo.getLastUpdated());
        dto.setVerifiedBy(eo.getVerifiedBy());
        return dto;
    }
}
