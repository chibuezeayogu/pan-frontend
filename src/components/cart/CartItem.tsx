import React from "react";
import { Product } from "../../types";
import { CURRENCY } from "../../util/index";

const CartItem = (
  {
  cart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  currency
  }:{ 
  cart: Product; 
  incrementQuantity: MouseEventHandler<HTMLButtonElement>; 
  decrementQuantity: MouseEventHandler<HTMLButtonElement>; 
  removeFromCart: MouseEventHandler<HTMLButtonElement>;
  currency: string  
}): JSX.Element => (
  <div className="cart-item">
    <div className="cart-item__title">
      <span>{cart.title}</span>
      <button onClick={()=> removeFromCart(cart)} className="close">{"X"}</button>
    </div>
    <div className="cart-item__body">
      <div className="quantity-btn">
        <button onClick={()=> decrementQuantity(cart)}>-</button>
        <span>{cart.quantity}</span>
        <button onClick={() => incrementQuantity(cart)}>+</button>
      </div>
      <span>{CURRENCY[currency]}{cart.quantity * cart.price}</span>
      <span><img src={cart.image_url} alt={cart.title}/></span>
    </div>
  </div>
)

export default CartItem;
