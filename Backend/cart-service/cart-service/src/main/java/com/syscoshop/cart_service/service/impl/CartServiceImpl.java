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
    public CartDTO getCart(String customerId) {
        Cart cart = cartRepository.findById(customerId)
                .orElseGet(() -> {
                    // Cart not found, create a new one
                    Cart newCart = new Cart(customerId);
                    newCart.setItems(new ArrayList<>());
                    newCart.setTotal(0.0);
                    return cartRepository.save(newCart);
                });

        return cartMapper.convertToDTO(cart);
    }



    @Override
    public CartDTO updateCart(String customerId, List<CartItemDTO> updatedItems) {
        Cart existingCart = cartRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for customer: " + customerId));

        // Convert current items into a map for quick lookup
        Map<String, CartItem> currentItems = existingCart.getItems()
                .stream()
                .collect(Collectors.toMap(CartItem::getProductId, item -> item));

        for (CartItemDTO dto : updatedItems) {
            String productId = dto.getProductId();

            if (dto.getQuantity() == null || dto.getQuantity() <= 0) {
                CartItem toRemove = currentItems.get(productId);
                if (toRemove != null) {
                    existingCart.getItems().remove(toRemove);
                }
            } else {
                CartItem existingItem = currentItems.get(productId);

                if (existingItem != null) {
                    // Replace quantity
                    existingItem.setQuantity(dto.getQuantity());
                    existingItem.setPrice(dto.getPrice()); // update price if necessary
                    existingItem.setName(dto.getName());
                    existingItem.setImageUrl(dto.getImageUrl());
                } else {
                    // Add new item
                    CartItem newItem = new CartItem();
                    newItem.setProductId(dto.getProductId());
                    newItem.setName(dto.getName());
                    newItem.setQuantity(dto.getQuantity());
                    newItem.setPrice(dto.getPrice());
                    newItem.setImageUrl(dto.getImageUrl());
                    newItem.setCart(existingCart); // maintain relationship
                    existingCart.getItems().add(newItem);
                }
            }
        }

        // Recalculate total
        existingCart.setTotal(CartUtil.CalculateTotal(existingCart));

        Cart updatedCart = cartRepository.save(existingCart);
        return cartMapper.convertToDTO(updatedCart);
    }


}
