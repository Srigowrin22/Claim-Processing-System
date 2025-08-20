package training.iqgateway.controller.dto;


import java.time.Instant;

public class ClaimDTO {

    private Integer id;
    private Integer customerId;
    private Integer hospitalId;
    private Integer docId;

    private Double expectedAmount;
    private Double approvedAmount;

    private Instant submittedDate;
    private Instant lastUpdatedDate;

    private String status;
    private String feedback;

    private Integer document;
    private Integer medicalValid;  // Single validator id

    private Integer givenPolicyId;
  

    // Getters and setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getCustomerId() { return customerId; }
    public void setCustomerId(Integer customerId) { this.customerId = customerId; }
    public Integer getHospitalId() { return hospitalId; }
    public void setHospitalId(Integer hospitalId) { this.hospitalId = hospitalId; }
    public Integer getDocId() { return docId; }
    public void setDocId(Integer docId) { this.docId = docId; }
    public Double getExpectedAmount() { return expectedAmount; }
    public void setExpectedAmount(Double expectedAmount) { this.expectedAmount = expectedAmount; }
    public Double getApprovedAmount() { return approvedAmount; }
    public void setApprovedAmount(Double approvedAmount) { this.approvedAmount = approvedAmount; }
    public Instant getSubmittedDate() { return submittedDate; }
    public void setSubmittedDate(Instant submittedDate) { this.submittedDate = submittedDate; }
    public Instant getLastUpdatedDate() { return lastUpdatedDate; }
    public void setLastUpdatedDate(Instant lastUpdatedDate) { this.lastUpdatedDate = lastUpdatedDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
    public Integer getDocument() { return document; }
    public void setDocument(Integer document) { this.document = document; }
    public Integer getMedicalValid() { return medicalValid; }
    public void setMedicalValid(Integer medicalValid) { this.medicalValid = medicalValid; }
    public Integer getGivenPolicyId() { return givenPolicyId; }
    public void setGivenPolicyId(Integer givenPolicyId) { this.givenPolicyId = givenPolicyId; }
    
}
