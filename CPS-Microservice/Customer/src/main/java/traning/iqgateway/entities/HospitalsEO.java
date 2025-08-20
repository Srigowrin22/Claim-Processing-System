package traning.iqgateway.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "hospitals")
public class HospitalsEO {

    @Id
    @Field("_id")
    private Integer id;

    @Field("hospital_name")
    private String hospitalName;

    @Field("address")
    private String address;

    @Field("city")
    private String city;

    @Field("contact")
    private String contact;

    public HospitalsEO() {
    }

    public HospitalsEO(Integer id, String hospitalName, String address, String city, String contact) {
        this.id = id;
        this.hospitalName = hospitalName;
        this.address = address;
        this.city = city;
        this.contact = contact;
    }

    // Getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }
}
