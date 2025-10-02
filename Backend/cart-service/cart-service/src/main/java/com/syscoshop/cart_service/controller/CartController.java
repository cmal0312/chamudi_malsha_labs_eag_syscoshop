package com.syscoshop.cart_service.controller;

import com.syscoshop.cart_service.constants.Constants;
import com.syscoshop.cart_service.dto.CartDTO;
import com.syscoshop.cart_service.dto.CartUpdateRequestDTO;
import com.syscoshop.cart_service.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Constants.BASE_PATH+"/")
public class CartController extends AbstractController {

    private final CartService cartService;


    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public ResponseEntity<?> createCart(@RequestHeader("x-user-id") String id){
        logger.info("Creating cart for the new customer");
        try{
            CartDTO cart = cartService.createCart(id);
            return buildSuccessResponse(cart);
        } catch (Exception e) {
            logger.info("Error creating cart for the customer");
            throw e;
        }

    }

    @GetMapping
    public ResponseEntity<?> getCart(@RequestHeader("x-user-id") String id){
        logger.info("Fetching cart for customer: "+ id);
        try {
            CartDTO cart = cartService.getCart(id);
            return buildSuccessResponse(cart);
        } catch (Exception e) {
            logger.info("Error fetching cart items from cart-service");
            throw e;
        }
    }

    @PutMapping
    public ResponseEntity<?> updateCart(
            @RequestHeader("x-user-id") String id,
            @RequestBody CartUpdateRequestDTO request
            ){

        try {
            logger.info("Update the cart for customer: " + id);
            CartDTO updatedCart = cartService.updateCart(
                    id,
                    request.getItems()
            );

            return buildSuccessResponse(updatedCart);
        } catch (Exception e) {
            logger.info("Error updating the cart items");
            throw e;
        }
    }
}
