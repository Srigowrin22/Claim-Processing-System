package traning.iqgateway.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
@Document(collection = "hospitals")
public class HospitalEO {

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

    public HospitalEO() {}

    public HospitalEO(Integer id, String hospitalName, String address, String city, String contact) {
        this.id = id;
        this.hospitalName = hospitalName;
        this.address = address;
        this.city = city;
        this.contact = contact;
    }
}
