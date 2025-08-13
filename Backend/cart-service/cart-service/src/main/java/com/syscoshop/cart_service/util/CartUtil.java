package com.syscoshop.cart_service.util;

import com.syscoshop.cart_service.model.Cart;
import com.syscoshop.cart_service.model.CartItem;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CartUtil {

    private CartUtil(){}

    public static Double CalculateTotal(Cart cart){
        List<CartItem> cartItems = cart.getItems();
        Double total = (double) 0;
        for(CartItem item : cartItems){
            Double itemPrice = item.getPrice() * item.getQuantity();
            total =  total+ itemPrice;
        }
        return total;
    }
}
