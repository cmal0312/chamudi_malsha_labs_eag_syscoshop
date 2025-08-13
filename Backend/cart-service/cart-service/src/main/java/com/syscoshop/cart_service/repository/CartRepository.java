package com.syscoshop.cart_service.repository;

import com.syscoshop.cart_service.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, String> {
}
