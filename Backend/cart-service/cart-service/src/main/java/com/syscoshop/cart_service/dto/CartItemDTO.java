package com.syscoshop.cart_service.dto;

public class CartItemDTO {

    private String productId;
    private String name;
    private Double price;
    private Integer quantity;
    private String imageUrl;

    public CartItemDTO(){}


    public CartItemDTO(Integer quantity, Double price, String name, String productId, String imageUrl) {
        this.quantity = quantity;
        this.price = price;
        this.name = name;
        this.productId = productId;
        this.imageUrl = imageUrl;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
