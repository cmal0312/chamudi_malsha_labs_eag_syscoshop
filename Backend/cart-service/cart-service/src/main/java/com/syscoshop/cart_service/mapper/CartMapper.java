package com.syscoshop.cart_service.mapper;

import com.syscoshop.cart_service.dto.CartDTO;
import com.syscoshop.cart_service.dto.CartItemDTO;
import com.syscoshop.cart_service.model.Cart;
import com.syscoshop.cart_service.repository.CartRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CartMapper {

    private final CartRepository cartRepository;
    private final CartItemMapper cartItemMapper;

    public CartMapper(CartRepository cartRepository, CartItemMapper cartItemMapper){
        this.cartRepository = cartRepository;
        this.cartItemMapper = cartItemMapper;
    }

    public CartDTO convertToDTO(Cart cart){

        CartDTO cartDTO = new CartDTO();
        cartDTO.setCustomerId(cart.getCustomerId());
        List<CartItemDTO> itemDTOList = cart.getItems().stream()
                        .map(cartItemMapper::convertToDTO)
                                .toList();
        cartDTO.setItems(itemDTOList);
        cartDTO.setTotal(cart.getTotal());
        return cartDTO;
    }
}
