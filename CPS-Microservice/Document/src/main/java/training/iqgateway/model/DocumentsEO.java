package training.iqgateway.model;
 
import java.util.Map;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
 
@Document(collection="documents")
public class DocumentsEO {
    @Id
    private Integer _id;
 
    @Field("claim_id")
    private Integer claimId;
 
    @Field("blood_test")
    private Map<String, String> bloodTest;
 
    @Field("admission_note")
    private Map<String, String> admissionNote;
 
    @Field("prescription")
    private Map<String, String> prescription;
 
    @Field("xray_report")
    private Map<String, String> xrayReport;
 
    @Field("insurance_form")
    private Map<String, String> insuranceForm;
 
    @Field("discharge_summary")
    private Map<String, String> dischargeSummary;
 
    @Field("other")
    private Map<String, String> other;
 
    @Field("last_updated")
    private String lastUpdated;
 
    @Field("verified_by")
    private Integer verifiedBy;
 
    public DocumentsEO() {}
 
    public DocumentsEO(
        Integer _id, Integer claimId,
        Map<String, String> bloodTest,
        Map<String, String> admissionNote,
        Map<String, String> prescription,
        Map<String, String> xrayReport,
        Map<String, String> insuranceForm,
        Map<String, String> dischargeSummary,
        Map<String, String> other,
        String lastUpdated, Integer verifiedBy
    ) {
        this._id = _id;
        this.claimId = claimId;
        this.bloodTest = bloodTest;
        this.admissionNote = admissionNote;
        this.prescription = prescription;
        this.xrayReport = xrayReport;
        this.insuranceForm = insuranceForm;
        this.dischargeSummary = dischargeSummary;
       this.other = other;
        this.lastUpdated = lastUpdated;
        this.verifiedBy = verifiedBy;
    }
 
    public Integer get_id() { return _id; }
    public void set_id(Integer _id) { this._id = _id; }
 
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
        return "DocumentsEO [_id=" + _id +
            ", claim_id=" + claimId +
            ", bloodTest=" + bloodTest +
            ", admissionNote=" + admissionNote +
            ", prescription=" + prescription +
            ", xrayReport=" + xrayReport +
            ", insuranceForm=" + insuranceForm +
            ", dischargeSummary=" + dischargeSummary +
            ", other=" + other +
            ", lastUpdated=" + lastUpdated +
            ", verifiedBy=" + verifiedBy + "]";
    }
}
 
 