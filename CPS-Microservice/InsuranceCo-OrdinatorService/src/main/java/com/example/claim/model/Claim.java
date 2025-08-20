package com.example.claim.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "claims")
public class Claim {

    @Id
    @Field("_id")  // explicit mapping
    private Integer id;

    @Field("customer_id")       // ✅ map snake_case -> camelCase
    private Integer customerId;

    @Field("hospital_id")
    private Integer hospitalId;

    @Field("doc_id")
    private Integer docId;

    @Field("expected_amount")
    private Integer expectedAmount;

    @Field("approved_amount")
    private Integer approvedAmount;

    @Field("submitted_date")
    private String submittedDate;

    @Field("last_updated_date")
    private String lastUpdatedDate;

    private String status; // same name → no mapping needed
    private String feedback;

    @Field("document")
    private Integer document;

    @Field("medical_valid")
    private List<String> medicalValid;

    @Field("given_policy_id")
    private Integer givenPolicyId;

    public Claim() {}

    // ✅ Getters/Setters ...
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getCustomerId() { return customerId; }
    public void setCustomerId(Integer customerId) { this.customerId = customerId; }

    public Integer getHospitalId() { return hospitalId; }
    public void setHospitalId(Integer hospitalId) { this.hospitalId = hospitalId; }

    public Integer getDocId() { return docId; }
    public void setDocId(Integer docId) { this.docId = docId; }

    public Integer getExpectedAmount() { return expectedAmount; }
    public void setExpectedAmount(Integer expectedAmount) { this.expectedAmount = expectedAmount; }

    public Integer getApprovedAmount() { return approvedAmount; }
    public void setApprovedAmount(Integer approvedAmount) { this.approvedAmount = approvedAmount; }

    public String getSubmittedDate() { return submittedDate; }
    public void setSubmittedDate(String submittedDate) { this.submittedDate = submittedDate; }

    public String getLastUpdatedDate() { return lastUpdatedDate; }
    public void setLastUpdatedDate(String lastUpdatedDate) { this.lastUpdatedDate = lastUpdatedDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public Integer getDocument() { return document; }
    public void setDocument(Integer document) { this.document = document; }

    public List<String> getMedicalValid() { return medicalValid; }
    public void setMedicalValid(List<String> medicalValid) { this.medicalValid = medicalValid; }

    public Integer getGivenPolicyId() { return givenPolicyId; }
    public void setGivenPolicyId(Integer givenPolicyId) { this.givenPolicyId = givenPolicyId; }
}
