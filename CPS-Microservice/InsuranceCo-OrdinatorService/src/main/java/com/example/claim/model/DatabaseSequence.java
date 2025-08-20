package com.example.claim.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "counters")
public class DatabaseSequence {

    @Id
    private String id;  // sequence name
    private int seq;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public int getSeq() { return seq; }
    public void setSeq(int seq) { this.seq = seq; }
}
