package com.example.preauth.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "preAuthorization")
public class PreAuthorization {

    @Id
    private String id;  // ✅ Now stored as String (MongoDB ObjectId)

    private String cardNumber;
    private String policyNumber;
    private String patientName;
    private String policyType;
    private String validUntil;
    private String coverageAmount;
    private String status;

    public PreAuthorization() {}

    public PreAuthorization(String cardNumber, String policyNumber, String patientName,
                            String policyType, String validUntil,
                            String coverageAmount, String status) {
        this.cardNumber = cardNumber;
        this.policyNumber = policyNumber;
        this.patientName = patientName;
        this.policyType = policyType;
        this.validUntil = validUntil;
        this.coverageAmount = coverageAmount;
        this.status = status;
    }

    // ✅ Getters & Setters
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getCardNumber() {
        return cardNumber;
    }
    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    public String getPolicyNumber() {
        return policyNumber;
    }
    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }
    public String getPatientName() {
        return patientName;
    }
    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }
    public String getPolicyType() {
        return policyType;
    }
    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }
    public String getValidUntil() {
        return validUntil;
    }
    public void setValidUntil(String validUntil) {
        this.validUntil = validUntil;
    }
    public String getCoverageAmount() {
        return coverageAmount;
    }
    public void setCoverageAmount(String coverageAmount) {
        this.coverageAmount = coverageAmount;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
}
