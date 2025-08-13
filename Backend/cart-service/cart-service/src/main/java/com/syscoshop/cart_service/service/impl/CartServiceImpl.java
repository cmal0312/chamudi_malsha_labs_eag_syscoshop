package com.syscoshop.cart_service.service.impl;

import com.syscoshop.cart_service.dto.CartDTO;
import com.syscoshop.cart_service.dto.CartItemDTO;
import com.syscoshop.cart_service.exception.InvalidCartOperationException;
import com.syscoshop.cart_service.exception.ResourceNotFoundException;
import com.syscoshop.cart_service.mapper.CartItemMapper;
import com.syscoshop.cart_service.mapper.CartMapper;
import com.syscoshop.cart_service.model.Cart;
import com.syscoshop.cart_service.model.CartItem;
import com.syscoshop.cart_service.repository.CartItemRepository;
import com.syscoshop.cart_service.repository.CartRepository;
import com.syscoshop.cart_service.service.CartService;
import com.syscoshop.cart_service.util.CartUtil;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final CartMapper cartMapper;
    private final CartItemMapper cartItemMapper;

    public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository, CartMapper cartMapper, CartItemMapper cartItemMapper) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.cartMapper = cartMapper;
        this.cartItemMapper = cartItemMapper;
    }

    @Override
    public CartDTO createCart(String customerId){
        Cart newCart = new Cart(customerId);
        List<CartItem> cartItems = new ArrayList<>();
        newCart.setTotal((double) 0);
        newCart.setItems(cartItems);
        Cart saved = cartRepository.save(newCart);
        return cartMapper.convertToDTO(saved);
    }

    @Override
    public CartDTO getCart(String customerId){
        return cartMapper.convertToDTO(cartRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for the customer: "+ customerId)));
    }

    @Override
    public CartDTO updateCart(String customerId, List<CartItemDTO> updatedItems) {
        Cart existingCart = cartRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for customer: " + customerId));

        // Clear the current items to safely trigger orphan removal
        existingCart.getItems().clear();

        // Add updated items
        for (CartItemDTO dto : updatedItems) {
            if (dto.getQuantity() == null || dto.getQuantity() <= 0) continue; // skip or optionally throw

            CartItem item = new CartItem();
            item.setProductId(dto.getProductId());
            item.setName(dto.getName());
            item.setQuantity(dto.getQuantity());
            item.setPrice(dto.getPrice());
            item.setCart(existingCart); // maintain bidirectional relationship

            existingCart.getItems().add(item);
        }

        // Recalculate total and save
        existingCart.setTotal(CartUtil.CalculateTotal(existingCart));
        Cart updatedCart = cartRepository.save(existingCart);

        return cartMapper.convertToDTO(updatedCart);
    }

}
