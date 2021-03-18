import React from "react";
import CartItem from "./CartItem";
import { Product } from "../../types";
import { CURRENCY } from "../../util/index";

const CartList = (
  {
    carts,
    incrementQuantity,
    decrementQuantity,
    showOrHideCart,
    removeFromCart,
    onChange,
    currency
  }:{ 
    carts: Product[]; 
    incrementQuantity: MouseEventHandler<HTMLButtonElement>; 
    decrementQuantity: MouseEventHandler<HTMLButtonElement>; 
    showOrHideCart: MouseEventHandler<HTMLButtonElement>; 
    removeFromCart: MouseEventHandler<HTMLButtonElement>; 
    onChange: MouseEventHandler<HTMLButtonElement>; 
    currency: string
  }) :JSX.Element => {

   const cartSubstotal = (): number => {
     let subtotal = 0;
     carts.map(cart => {
       subtotal += (cart.quantity * cart.price);
     })
  
     return subtotal;
    }

  return (
    <div className="modal">
      <div className="cart-list">
        <div className="cart-list__header">
          <span>
            <button 
              className="header-btn"
              onClick={showOrHideCart}>
                &#60;
              </button>
            </span>
          <span className="header-text">Your Cart</span>
        </div>
        <div className="currency-options">
          <select onBlur={onChange} onChange={onChange}value={currency}>
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
          </select>
        </div>
        <div className="cart-list__body">
          {
            carts.map((cart) =>(
              <CartItem
                key={cart.id}
                cart={cart}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                removeFromCart={removeFromCart}
                currency={currency}
              />
            ))
          }
        </div>
        <div className="cart-list__footer">
          <div className="cart-total">
            <span>Subtotal</span>
            <span>{CURRENCY[currency]}{cartSubstotal()}</span>
          </div>
            <button className="subscription">MAKE THIS A SUBSCRIPTION (SAVE 20%)</button>
            <button className="ckeckout">PROCCED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default CartList;
