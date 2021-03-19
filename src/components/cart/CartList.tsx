import React, { useEffect, useState } from "react";
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
    currency,
  }:{ 
    carts: Product[]; 
    incrementQuantity: (id: number) => void; 
    decrementQuantity: (id: number, quantity: number) => void; 
    removeFromCart: (id: number) => void; 
    showOrHideCart: () => void; 
    onChange: (id: MouseEventHandler<HTMLButtonElement>) => void;
    currency: string;
  }) :JSX.Element => {

    const [cartSubTotal, setCartSubTotal] = useState<number>(0);
  
  useEffect(() => {
    if(carts.length) {
      calSubTotal(carts)
      console.log("=======CarlistUseEffect");
    }
  }, [carts]);

  const calSubTotal = (carts: Product[]): void => {
    const result = carts.map(cart => (cart.quantity * cart.price)).reduce((acc=0, cur)=> acc+cur);
    return setCartSubTotal(result);
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
            carts.map(({id, title, price, image_url, quantity }) =>(
              // <CartItem
              //   key={cart.id}
              //   cart={cart}
              //   incrementQuantity={incrementQuantity}
              //   decrementQuantity={decrementQuantity}
              //   removeFromCart={removeFromCart}
              //   currency={currency}
              // />
              <div className="cart-item" key={id}>
                <div className="cart-item__title">
                  <span>{title}</span>
                  <button onClick={()=> removeFromCart(id)} className="close">{"X"}</button>
                </div>
                <div className="cart-item__body">
                  <div className="quantity-btn">
                    <button onClick={()=> decrementQuantity(id, quantity)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => incrementQuantity(id)}>+</button>
                  </div>
                  <span>{CURRENCY[currency]} {price}</span>
                  <span><img src={image_url} alt={title}/></span>
                </div>
              </div>
            ))
          }
        </div>
        <div className="cart-list__footer">
          <div className="cart-total">
            <span>Subtotal</span>
            <span>{CURRENCY[currency]}{cartSubTotal}</span>
          </div>
            <button className="subscription">MAKE THIS A SUBSCRIPTION (SAVE 20%)</button>
            <button className="ckeckout">PROCCED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default CartList;
