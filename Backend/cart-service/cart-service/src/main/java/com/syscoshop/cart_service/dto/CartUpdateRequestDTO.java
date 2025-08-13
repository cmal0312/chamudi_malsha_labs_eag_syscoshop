package com.syscoshop.cart_service.dto;

import java.util.List;

public class CartUpdateRequestDTO {

    private List<CartItemDTO> items;


    public CartUpdateRequestDTO(List<CartItemDTO> items) {
        this.items = items;
    }

    public CartUpdateRequestDTO() {
    }

    public List<CartItemDTO> getItems() {
        return items;
    }

    public void setItems(List<CartItemDTO> items) {
        this.items = items;
    }
}
