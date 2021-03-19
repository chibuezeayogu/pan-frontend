import React, { useState, useEffect } from "react";
import { Product } from "../../types";
import { CURRENCY } from "../../util/index";
import { useQuery } from "@apollo/client";
import { LOAD_CURRENCY } from "./../../graphQL/Queries";

const CartItem = (
  {
  cart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  currency
  }:{ 
  cart: Product; 
  incrementQuantity: (id: number) => void; 
  decrementQuantity: (id: number, quantity: number) => void; 
  removeFromCart: (id: number) => void; 
  currency: string  
}): JSX.Element => {
  return (
    <div className="cart-item">
      <div className="cart-item__title">
        <span>{cart.title}</span>
        <button onClick={()=> removeFromCart(cart.id)} className="close">{"X"}</button>
      </div>
      <div className="cart-item__body">
        <div className="quantity-btn">
          <button onClick={()=> decrementQuantity(cart.id, cart.quantity)}>-</button>
          <span>{cart.quantity}</span>
          <button onClick={() => incrementQuantity(cart.id)}>+</button>
        </div>
        <span>{CURRENCY[currency]}{ cart.price} {cart.price}</span>
        <span><img src={cart.image_url} alt={cart.title}/></span>
      </div>
    </div>
  )
}

export default CartItem;
