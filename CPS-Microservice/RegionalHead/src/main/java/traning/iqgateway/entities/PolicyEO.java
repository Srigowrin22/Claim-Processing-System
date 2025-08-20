package traning.iqgateway.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
@Document(collection = "policies") // corresponds to MongoDB collection name
public class PolicyEO {

    @Id
    @Field("_id")
    private Integer id;

    @Field("policy_name")
    private String policyName;

    @Field("sum_assured")
    private Integer sumAssured;

    @Field("premium")
    private Integer premium;

    @Field("validity")
    private String validity;

    @Field("exclusion")
    private String exclusion;

    public PolicyEO() {
        super();
    }

    public PolicyEO(Integer id, String policyName, Integer sumAssured, Integer premium, String validity, String exclusion) {
        super();
        this.id = id;
        this.policyName = policyName;
        this.sumAssured = sumAssured;
        this.premium = premium;
        this.validity = validity;
        this.exclusion = exclusion;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    public Integer getSumAssured() {
        return sumAssured;
    }

    public void setSumAssured(Integer sumAssured) {
        this.sumAssured = sumAssured;
    }

    public Integer getPremium() {
        return premium;
    }

    public void setPremium(Integer premium) {
        this.premium = premium;
    }

    public String getValidity() {
        return validity;
    }

    public void setValidity(String validity) {
        this.validity = validity;
    }

    public String getExclusion() {
        return exclusion;
    }

    public void setExclusion(String exclusion) {
        this.exclusion = exclusion;
    }
}
