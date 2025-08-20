package traning.iqgateway.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "customers")
public class CustomerEO {

    @Id
    @Field("_id")
    private Integer id;

    @Field("customer_name")
    private String customerName;

    @Field("customer_address")
    private String customerAddress;

    @Field("customer_aadhaar")
    private String customerAadhaar;

    @Field("customer_email")
    private String customerEmail;

    @Field("customer_password")
    private String customerPassword;

    @Field("customer_dob")
    private LocalDate customerDob;

    @Field("customer_phone")
    private String customerPhone;

    @Field("nominee_name")
    private String nomineeName;

    @Field("nominee_dob")
    private LocalDate nomineeDob;

    @Field("nominee_relation")
    private String nomineeRelation;

    @Field("policies")
    private List<PolicyEntry> policies = new ArrayList<>();

    public CustomerEO() {}

    public CustomerEO(Integer id, String customerName, String customerAddress, String customerAadhaar,
                      String customerEmail, String customerPassword, LocalDate customerDob,
                      String customerPhone, String nomineeName, LocalDate nomineeDob,
                      String nomineeRelation, List<PolicyEntry> policies) {
        this.id = id;
        this.customerName = customerName;
        this.customerAddress = customerAddress;
        this.customerAadhaar = customerAadhaar;
        this.customerEmail = customerEmail;
        this.customerPassword = customerPassword;
        this.customerDob = customerDob;
        this.customerPhone = customerPhone;
        this.nomineeName = nomineeName;
        this.nomineeDob = nomineeDob;
        this.nomineeRelation = nomineeRelation;
        this.policies = policies;
    }

    // Getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public String getCustomerAadhaar() {
        return customerAadhaar;
    }

    public void setCustomerAadhaar(String customerAadhaar) {
        this.customerAadhaar = customerAadhaar;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPassword() {
        return customerPassword;
    }

    public void setCustomerPassword(String customerPassword) {
        this.customerPassword = customerPassword;
    }

    public LocalDate getCustomerDob() {
        return customerDob;
    }

    public void setCustomerDob(LocalDate customerDob) {
        this.customerDob = customerDob;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getNomineeName() {
        return nomineeName;
    }

    public void setNomineeName(String nomineeName) {
        this.nomineeName = nomineeName;
    }

    public LocalDate getNomineeDob() {
        return nomineeDob;
    }

    public void setNomineeDob(LocalDate nomineeDob) {
        this.nomineeDob = nomineeDob;
    }

    public String getNomineeRelation() {
        return nomineeRelation;
    }

    public void setNomineeRelation(String nomineeRelation) {
        this.nomineeRelation = nomineeRelation;
    }

    public List<PolicyEntry> getPolicies() {
        return policies;
    }

    public void setPolicies(List<PolicyEntry> policies) {
        this.policies = policies;
    }

    // Static inner class for PolicyEntry
    public static class PolicyEntry {

        @Field("policy_id")
        private Integer policyId;

        @Field("cover_id")
        private Integer coverId;

        public PolicyEntry() {}

        public PolicyEntry(Integer policyId, Integer coverId) {
            this.policyId = policyId;
            this.coverId = coverId;
        }

        public Integer getPolicyId() {
            return policyId;
        }

        public void setPolicyId(Integer policyId) {
            this.policyId = policyId;
        }

        public Integer getCoverId() {
            return coverId;
        }

        public void setCoverId(Integer coverId) {
            this.coverId = coverId;
        }
    }
}
