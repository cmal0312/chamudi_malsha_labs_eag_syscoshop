package com.syscoshop.cart_service.repository;

import com.syscoshop.cart_service.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
