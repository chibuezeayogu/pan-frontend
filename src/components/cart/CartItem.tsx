import React from "react";
import { Product } from "../../types";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  margin: 0 auto;
  border-color: green;
`;

const CartItem = (
  {
  cartItem,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  currency
} : { 
  cartItem: Product,
  incrementQuantity: (id: number) => void,
  decrementQuantity: (id: number, quantity: number) => void,
  removeFromCart: (id: number) => void,
  currency: string
}): JSX.Element => (
  <div className="cart-item" key={cartItem.id}>
    <div className="cart-item__title">
      <span>{cartItem.title}</span>
      <button onClick={()=> removeFromCart(cartItem.id)} className="close">{"X"}</button>
    </div>
    <div className="cart-item__body">
      <div className="quantity-btn">
        <button onClick={()=> decrementQuantity(cartItem.id, cartItem.quantity)}>-</button>
        <span>{cartItem.quantity}</span>
        <button onClick={() => incrementQuantity(cartItem.id)}>+</button>
      </div>
      <span>
        {`${currency} `} 
        {
          !Number.isNaN(cartItem.price) ? 
            cartItem.price : 
            <ClipLoader 
              color={'#ffffff'} 
              loading={Number.isNaN(cartItem.price)} 
              css={override} 
              size={10} 
            />
        }
      </span>
      <span><img src={cartItem.image_url} alt={cartItem.title}/></span>
    </div>
  </div>
)

export default CartItem;
