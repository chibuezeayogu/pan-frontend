import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import ProductItem from "./ProductItem";
import { Product }  from '../../types'
import { updateQuantity } from "../../util/index"
import { LOAD_PRODUCTS } from "../../graphQL/queries"
import CartList from "../cart/CartList";

const override = css`
  display: block;
  border-color: red;
  margin-top: 30%;
`;

const ProductList = (): JSX.Element => {
  const [currency, setCurrency] = useState<string>("NGN");
  const { loading, data } = useQuery(LOAD_PRODUCTS, { variables: { currency: currency }});
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [toggleCart, setToggleCart] = useState<boolean>(false);

 const addToCart = (productId: number): void => {
    const cartItem = data.products.find((el: Product) => el.id == productId);
    const index = cartItems.findIndex(el => el.id === cartItem.id);

    if (index !== -1) {
      setCartItems(updateQuantity(productId, cartItems, "Add"));
    } else {
      setCartItems(prevState => ([...prevState, { ...cartItem, quantity: 1 }]));
      setToggleCart(!toggleCart);
    }
  }

  const removeFromCart = (productId: number): void => {
    setCartItems(cartItems.filter(cart => cart.id !== productId));
  }

  const incrementQuantity = (productId: number): void => {
    setCartItems(updateQuantity(productId, cartItems, "Add"));
  }

  const decrementQuantity = (productId: number, productQuantity: number): void => {
    if(productQuantity > 1) {
      setCartItems(updateQuantity(productId, cartItems, "Subtract"));
    } else {
      removeFromCart(productId);
    }
  }

  const quantityCount = (): number => {
    if(!cartItems.length) return 0;
    
    return cartItems.map(cartItem => cartItem.quantity).reduce((acc, cur) => acc + cur);
  }


  const calCartItemsPrice = (): Product[] => {
    return cartItems.map(cartItem => {
      const inCart = data?.products.find((el: Product) => el.id === cartItem.id);
      return { ...cartItem, price: inCart?.price * cartItem.quantity }
    });
  }

  return (
    <>
      <div className="nav">
        <div className="menu">
          <span>LUMIN</span>
          <span>Shop</span>
          <span>Learn</span>
        </div>
        <div className="cart-total">
          <span>Account</span>
          <span
            className="cart-total__count"
            onClick={() => setToggleCart(!toggleCart)}
            role="button"
            onKeyDown={() => setToggleCart(!toggleCart)}
            // eslint-disable-next-line jsx-a11y/tabindex-no-positive
            tabIndex={1}>
            <i className="fas fa-shopping-cart">&nbsp;&nbsp;{quantityCount()}</i></span>
        </div>
      </div>
      <div className="product-list">
        { loading ? 
        <BeatLoader 
          color={'#343D34'} 
          loading={loading} 
          css={override}  
        /> :
        data.products.map((product: Product) => 
          <ProductItem
          key={product.id}
          product={product}
          addToCart={addToCart}
          currency={currency}
          />)
        }
      </div>
      {
        toggleCart &&
        <CartList
          cartItems={calCartItemsPrice()}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          removeFromCart={removeFromCart}
          currency={currency}
          setCurrency={setCurrency}
          setToggleCart={setToggleCart}
          toggleCart={toggleCart}
        /> 
      }
    </>
  )
}

export default ProductList;
