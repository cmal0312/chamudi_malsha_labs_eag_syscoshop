package com.syscoshop.cart_service.dto;
import java.util.List;

import com.syscoshop.cart_service.model.CartItem;

public class CartDTO {

    private String customerId;
    private List<CartItemDTO> items;
    private Double total;

    public CartDTO(){}

    public CartDTO(String customerId, List<CartItemDTO> items, Double total){
        this.customerId = customerId;
        this.items = items;
        this.total = total;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public List<CartItemDTO> getItems() {
        return items;
    }

    public void setItems(List<CartItemDTO> items) {
        this.items = items;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
}
