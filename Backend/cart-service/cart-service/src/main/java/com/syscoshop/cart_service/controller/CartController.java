package com.syscoshop.cart_service.controller;

import com.syscoshop.cart_service.dto.CartDTO;
import com.syscoshop.cart_service.dto.CartUpdateRequestDTO;
import com.syscoshop.cart_service.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(AbstractController.BASE_PATH+"/")
public class CartController extends AbstractController {

    private final CartService cartService;


    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public ResponseEntity<?> createCart(@RequestHeader("x-user-id") String id){
        logger.info("Creating cart for the new customer");
        CartDTO cart = cartService.createCart(id);
        return buildSuccessResponse(cart);
    }

    @GetMapping
    public ResponseEntity<?> getCart(@RequestHeader("x-user-id") String id){
        logger.info("Fetching cart for customer: "+ id);
        CartDTO cart = cartService.getCart(id);
        return buildSuccessResponse(cart);
    }

    @PutMapping
    public ResponseEntity<?> updateCart(
            @RequestHeader("x-user-id") String id,
            @RequestBody CartUpdateRequestDTO request
            ){

        logger.info("Update the cart for customer: " + id);
        CartDTO updatedCart = cartService.updateCart(
                id,
                request.getItems()
        );

        return buildSuccessResponse(updatedCart);
    }
}
