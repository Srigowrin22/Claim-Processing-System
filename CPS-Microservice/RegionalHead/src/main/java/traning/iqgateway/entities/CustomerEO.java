package traning.iqgateway.entities;

import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
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
    private OffsetDateTime customerDob;

    @Field("customer_phone")
    private String customerPhone;

    @Field("nominee_name")
    private String nomineeName;

    @Field("nominee_dob")
    private OffsetDateTime nomineeDob;

    @Field("nominee_relation")
    private String nomineeRelation;

    @Field("policies")
    private List<Integer> policies;
}
