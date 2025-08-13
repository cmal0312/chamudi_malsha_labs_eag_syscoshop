package com.syscoshop.cart_service.mapper;

import com.syscoshop.cart_service.dto.CartItemDTO;
import com.syscoshop.cart_service.model.CartItem;
import com.syscoshop.cart_service.repository.CartItemRepository;
import org.springframework.stereotype.Component;

@Component
public class CartItemMapper {

    private final CartItemRepository cartItemRepository;

    public CartItemMapper(CartItemRepository cartItemRepository){
        this.cartItemRepository = cartItemRepository;
    }

    public CartItemDTO convertToDTO(CartItem cartItem){

        CartItemDTO cartItemDTO = new CartItemDTO();
        cartItemDTO.setProductId(cartItem.getProductId());
        cartItemDTO.setName(cartItem.getName());
        cartItemDTO.setPrice(cartItem.getPrice());
        cartItemDTO.setQuantity(cartItem.getQuantity());
        return cartItemDTO;
    }
}
