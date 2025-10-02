package com.syscoshop.product_service.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String cognitoId;

    private String name;

    @OneToMany(mappedBy = "supplier")
    private List<Product> products;

    public Supplier(){}

    public Supplier(String cognitoId){
        this.cognitoId = cognitoId;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCognitoId() {
        return cognitoId;
    }

    public void setCognitoId(String cognitoId) {
        this.cognitoId = cognitoId;
    }

}
