package traning.iqgateway.entities;

import java.time.Instant;
//import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
@Document(collection = "claims")
public class ClaimsEO {

	@Id
	@Field("_id")
	private Integer id; // maps _id

	@Field("customer_id")
	private Integer customerId;

	@Field("hospital_id")
	private Integer hospitalId;

	@Field("doc_id")
	private Integer docId;

	@Field("expected_amount")
	private Integer expectedAmount;

	@Field("approved_amount")
	private Integer approvedAmount; // can be null

	@Field("submitted_date")
	private String submittedDate; // or LocalDate if you want to parse dates

	public ClaimsEO() {
		super();
	}

	public ClaimsEO(Integer id, Integer customerId, Integer hospitalId, Integer docId, Integer expectedAmount,
			Integer approvedAmount, String submittedDate, Instant lastUpdatedDate, String status,
			String feedback, Integer document, List<Integer> medicalValid, Integer givenPolicyId) {
		super();
		this.id = id;
		this.customerId = customerId;
		this.hospitalId = hospitalId;
		this.docId = docId;
		this.expectedAmount = expectedAmount;
		this.approvedAmount = approvedAmount;
		this.submittedDate = submittedDate;
		this.lastUpdatedDate = lastUpdatedDate;
		this.status = status;
		this.feedback = feedback;
		this.document = document;
		this.medicalValid = medicalValid;
		this.givenPolicyId = givenPolicyId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public Integer getHospitalId() {
		return hospitalId;
	}

	public void setHospitalId(Integer hospitalId) {
		this.hospitalId = hospitalId;
	}

	public Integer getDocId() {
		return docId;
	}

	public void setDocId(Integer docId) {
		this.docId = docId;
	}

	public Integer getExpectedAmount() {
		return expectedAmount;
	}

	public void setExpectedAmount(Integer expectedAmount) {
		this.expectedAmount = expectedAmount;
	}

	public Integer getApprovedAmount() {
		return approvedAmount;
	}

	public void setApprovedAmount(Integer approvedAmount) {
		this.approvedAmount = approvedAmount;
	}

	public String getSubmittedDate() {
		return submittedDate;
	}

	public void setSubmittedDate(String submittedDate) {
		this.submittedDate = submittedDate;
	}

	public Instant  getLastUpdatedDate() {
		return lastUpdatedDate;
	}

	public void setLastUpdatedDate(Instant  lastUpdatedDate) {
		this.lastUpdatedDate = lastUpdatedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public Integer getDocument() {
		return document;
	}

	public void setDocument(Integer document) {
		this.document = document;
	}

	public List<Integer> getMedicalValid() {
		return medicalValid;
	}

	public void setMedicalValid(List<Integer> medicalValid) {
		this.medicalValid = medicalValid;
	}

	public Integer getGivenPolicyId() {
		return givenPolicyId;
	}

	public void setGivenPolicyId(Integer givenPolicyId) {
		this.givenPolicyId = givenPolicyId;
	}

	@Field("last_updated_date")
	private Instant  lastUpdatedDate;

	@Field("status")
	private String status;

	@Field("feedback")
	private String feedback;

	@Field("document")
	private Integer document;

	@Field("medical_valid")
	private List<Integer> medicalValid;

	@Field("given_policy_id")
	private Integer givenPolicyId;

}
