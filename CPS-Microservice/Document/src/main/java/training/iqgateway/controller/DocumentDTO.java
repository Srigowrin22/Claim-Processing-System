//package training.iqgateway.controller;
//
//
//
//
//
//import java.util.Map;
//
//public class DocumentDTO {
//
//    private Integer id;             // Maps MongoDB _id
//    private Integer claimId;        // Corresponds to claim_id
//    private String bloodTest;       // Corresponds to blood_test
//    private String admissionNote;   // Corresponds to admission_note
//    private String prescription;
//    private String xrayReport;      // xray_report
//    private String insuranceForm;   // insurance_form
//    private String dischargeSummary;// discharge_summary
//   // private String other;
//    private Map<String, String> other;
//
//    private String lastUpdated;     // last_updated
//    private Integer verifiedBy;     // verified_by
//	public DocumentDTO() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//	public DocumentDTO(Integer id, Integer claimId, String bloodTest, String admissionNote, String prescription,
//			String xrayReport, String insuranceForm, String dischargeSummary, Map<String, String> other, String lastUpdated,
//			Integer verifiedBy) {
//		super();
//		this.id = id;
//		this.claimId = claimId;
//		this.bloodTest = bloodTest;
//		this.admissionNote = admissionNote;
//		this.prescription = prescription;
//		this.xrayReport = xrayReport;
//		this.insuranceForm = insuranceForm;
//		this.dischargeSummary = dischargeSummary;
//		this.other = other;
//		this.lastUpdated = lastUpdated;
//		this.verifiedBy = verifiedBy;
//	}
//	public Integer getId() {
//		return id;
//	}
//	public void setId(Integer id) {
//		this.id = id;
//	}
//	public Integer getClaimId() {
//		return claimId;
//	}
//	public void setClaimId(Integer claimId) {
//		this.claimId = claimId;
//	}
//	public String getBloodTest() {
//		return bloodTest;
//	}
//	public void setBloodTest(String bloodTest) {
//		this.bloodTest = bloodTest;
//	}
//	public String getAdmissionNote() {
//		return admissionNote;
//	}
//	public void setAdmissionNote(String admissionNote) {
//		this.admissionNote = admissionNote;
//	}
//	public String getPrescription() {
//		return prescription;
//	}
//	public void setPrescription(String prescription) {
//		this.prescription = prescription;
//	}
//	public String getXrayReport() {
//		return xrayReport;
//	}
//	public void setXrayReport(String xrayReport) {
//		this.xrayReport = xrayReport;
//	}
//	public String getInsuranceForm() {
//		return insuranceForm;
//	}
//	public void setInsuranceForm(String insuranceForm) {
//		this.insuranceForm = insuranceForm;
//	}
//	public String getDischargeSummary() {
//		return dischargeSummary;
//	}
//	public void setDischargeSummary(String dischargeSummary) {
//		this.dischargeSummary = dischargeSummary;
//	}
//	public Map<String, String> getOther() {
//		return other;
//	}
//	public void setOther(Map<String, String> other) {
//		this.other = other;
//	}
//	public String getLastUpdated() {
//		return lastUpdated;
//	}
//	public void setLastUpdated(String lastUpdated) {
//		this.lastUpdated = lastUpdated;
//	}
//	public Integer getVerifiedBy() {
//		return verifiedBy;
//	}
//	public void setVerifiedBy(Integer verifiedBy) {
//		this.verifiedBy = verifiedBy;
//	}
//	@Override
//	public String toString() {
//		return "DocumentDTO [id=" + id + ", claimId=" + claimId + ", bloodTest=" + bloodTest + ", admissionNote="
//				+ admissionNote + ", prescription=" + prescription + ", xrayReport=" + xrayReport + ", insuranceForm="
//				+ insuranceForm + ", dischargeSummary=" + dischargeSummary + ", other=" + other + ", lastUpdated="
//				+ lastUpdated + ", verifiedBy=" + verifiedBy + "]";
//	}
//
//	
//    
//    
//}
 
 
package training.iqgateway.controller;
 
import java.util.Map;
 
public class DocumentDTO {
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
 
    public DocumentDTO() {}
 
    public DocumentDTO(Integer id, Integer claimId, Map<String,String> bloodTest, Map<String,String> admissionNote,
                       Map<String,String> prescription, Map<String,String> xrayReport,
                       Map<String,String> insuranceForm, Map<String,String> dischargeSummary,
                       Map<String,String> other, String lastUpdated, Integer verifiedBy) {
        this.id = id;
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
        return "DocumentDTO{" +
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
 
 