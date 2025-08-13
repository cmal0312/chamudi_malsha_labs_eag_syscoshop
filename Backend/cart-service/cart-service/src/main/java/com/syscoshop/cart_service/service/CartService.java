package com.syscoshop.cart_service.service;

import com.syscoshop.cart_service.dto.CartDTO;
import com.syscoshop.cart_service.dto.CartItemDTO;

import java.util.List;

public interface CartService {
    CartDTO createCart(String customerId);
    CartDTO getCart(String customerId);
    CartDTO updateCart(String customerId, List<CartItemDTO> updatedItems);
}
