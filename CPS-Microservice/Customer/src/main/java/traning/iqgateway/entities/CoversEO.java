package traning.iqgateway.entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "covers")
public class CoversEO {

    @Id
    @Field("_id")
    private Integer id; 

    @Field("cover_name")
    private String coverName;

    @Field("cover_amount")
    private Integer coverAmount;

    @Field("cover_premium")
    private Integer coverPremium;

    // Addon field as list of strings
    @Field("addon")
    private List<String> addon;

    public CoversEO() {
    }

    public CoversEO(Integer id, String coverName, Integer coverAmount, Integer coverPremium, List<String> addon) {
        this.id = id;
        this.coverName = coverName;
        this.coverAmount = coverAmount;
        this.coverPremium = coverPremium;
        this.addon = addon;
    }

    // Getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCoverName() {
        return coverName;
    }

    public void setCoverName(String coverName) {
        this.coverName = coverName;
    }

    public Integer getCoverAmount() {
        return coverAmount;
    }

    public void setCoverAmount(Integer coverAmount) {
        this.coverAmount = coverAmount;
    }

    public Integer getCoverPremium() {
        return coverPremium;
    }

    public void setCoverPremium(Integer coverPremium) {
        this.coverPremium = coverPremium;
    }

    public List<String> getAddon() {
        return addon;
    }

    public void setAddon(List<String> addon) {
        this.addon = addon;
    }
}
