package com.example.hospital.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "hospitals")
public class Hospital {

    @Id
    private Integer id;  // ✅ Integer ID in Mongo

    @Field("hospital_name")  // ✅ Map snake_case → camelCase
    private String hospitalName;

    private String address;
    private String city;
    private String contact;

    public Hospital() {}

    public Hospital(Integer id, String hospitalName, String address, String city, String contact) {
        this.id = id;
        this.hospitalName = hospitalName;
        this.address = address;
        this.city = city;
        this.contact = contact;
    }

    // ✅ Getters & Setters
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
