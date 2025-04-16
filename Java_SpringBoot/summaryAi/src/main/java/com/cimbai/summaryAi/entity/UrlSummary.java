package com.cimbai.summaryAi.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "UrlSummary")
public class UrlSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public UUID id;
    public String url;
    @Column(length = 5000)
    public String summary;

}
