import React, { SetStateAction } from "react";
import { useQuery } from "@apollo/client";
import CartItem from "./CartItem";
import { Product } from "../../types";
import { LOAD_CURRENCY } from "../../graphQL/queries"
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  margin: 0 auto;
  border-color: green;
`;

const CartList =({
  cartItems,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  currency,
  setCurrency,
  toggleCart,
  setToggleCart
} : {
  cartItems: Product[];
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  setCurrency: React.Dispatch<SetStateAction<string>>;
  currency: string;
  toggleCart: boolean;
  setToggleCart: React.Dispatch<SetStateAction<boolean>>;
}): JSX.Element =>  {

  const { data } = useQuery(LOAD_CURRENCY);

  const cartSubTotal = () => {
    if(!cartItems.length) return 0;
    
    return cartItems.map(cartItem => cartItem.price).reduce((acc, cur) => acc + cur);
  }

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  return (
    <div className="modal">
      <div className="cart-list">
        <div className="cart-list__header">
          <span>
            <button
              className="header-btn"
              onClick={() => setToggleCart(!toggleCart)}>
              &#62;
            </button>
          </span>
          <span className="header-text">Your Cart</span>
        </div>
        <div className="currency-options">
          <select onBlur={onChange} onChange={onChange} value={currency}>
            {data?.currency.map((curr: string) => (
              <option value={curr} key={curr}>{curr}</option>
            ))}
          </select>
        </div>
        <div className="cart-list__body">
          { cartItems.length ? cartItems.map(cartItem => (
            <CartItem
              key={cartItem.id}
              cartItem={cartItem}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              removeFromCart={removeFromCart}
              currency={currency}
            />
          )) : <span className="empty-cart">{'Your cart is empty'}</span>}
        </div>
        <div className="cart-list__footer">
          <div className="cart-total">
            <span>Subtotal</span>
            <span>{currency} {
                !Number.isNaN(cartSubTotal()) ? 
                cartSubTotal(): 
                <ClipLoader 
                  color={'#ffffff'} 
                  loading={Number.isNaN(cartSubTotal())} 
                  css={override} 
                  size={10} 
                />
            }</span>
          </div>
          <button className="subscription">MAKE THIS A SUBSCRIPTION (SAVE 20%)</button>
          <button className="ckeckout">PROCCED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}

export default CartList;
