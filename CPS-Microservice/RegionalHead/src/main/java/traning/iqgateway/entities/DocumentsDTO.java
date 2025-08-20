package traning.iqgateway.entities;

import java.util.Map;

public class DocumentsDTO {

    private Integer id;
    private Integer claimId;

    private Map<String, String> bloodTest;
    private Map<String, String> admissionNote;
    private Map<String, String> prescription;
    private Map<String, String> xrayReport;
    private Map<String, String> insuranceForm;
    private Map<String, String> dischargeSummary;
    private Map<String, String> other;

    private String lastUpdated;
    private Integer verifiedBy;

    public DocumentsDTO() {}

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getClaimId() { return claimId; }
    public void setClaimId(Integer claimId) { this.claimId = claimId; }

    public Map<String, String> getBloodTest() { return bloodTest; }
    public void setBloodTest(Map<String, String> bloodTest) { this.bloodTest = bloodTest; }

    public Map<String, String> getAdmissionNote() { return admissionNote; }
    public void setAdmissionNote(Map<String, String> admissionNote) { this.admissionNote = admissionNote; }

    public Map<String, String> getPrescription() { return prescription; }
    public void setPrescription(Map<String, String> prescription) { this.prescription = prescription; }

    public Map<String, String> getXrayReport() { return xrayReport; }
    public void setXrayReport(Map<String, String> xrayReport) { this.xrayReport = xrayReport; }

    public Map<String, String> getInsuranceForm() { return insuranceForm; }
    public void setInsuranceForm(Map<String, String> insuranceForm) { this.insuranceForm = insuranceForm; }

    public Map<String, String> getDischargeSummary() { return dischargeSummary; }
    public void setDischargeSummary(Map<String, String> dischargeSummary) { this.dischargeSummary = dischargeSummary; }

    public Map<String, String> getOther() { return other; }
    public void setOther(Map<String, String> other) { this.other = other; }

    public String getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(String lastUpdated) { this.lastUpdated = lastUpdated; }

    public Integer getVerifiedBy() { return verifiedBy; }
    public void setVerifiedBy(Integer verifiedBy) { this.verifiedBy = verifiedBy; }

    @Override
    public String toString() {
        return "DocumentsDTO{" +
                "id=" + id +
                ", claimId=" + claimId +
                ", bloodTest=" + bloodTest +
                ", admissionNote=" + admissionNote +
                ", prescription=" + prescription +
                ", xrayReport=" + xrayReport +
                ", insuranceForm=" + insuranceForm +
                ", dischargeSummary=" + dischargeSummary +
                ", other=" + other +
                ", lastUpdated='" + lastUpdated + '\'' +
                ", verifiedBy=" + verifiedBy +
                '}';
    }
}
