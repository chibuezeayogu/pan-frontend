import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import ProductItem from "./ProductItem";
import { Product }  from '../../types'
import { findAndUpdate, updateQuantity, updateCartPrice } from "../../util/index"
import { LOAD_PRODUCTS } from "../../graphQL/Queries"
import CartList from "../cart/CartList";

const ProductList = (): JSX.Element => {
  const [currency, setCurrency] = useState<string>("NGN");
  const { error, loading, data } = useQuery(LOAD_PRODUCTS, { variables: { currency: currency }});
  const [carts, setCarts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [toggleCart, setToggleCart] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      // setProducts(data.products);
      setCarts(updateCartPrice(carts, data.products))
    } 
  }, [data, carts]);


  const addToCart = (product: Product): void => {
    // setProducts(findAndUpdate(product, products, true))
    const cartItem = carts.find(el => el.id === product.id)
    if (cartItem) {
      setCarts(updateQuantity(product, carts, "Add"));
    } else {
      setCarts(prevState => ([...prevState, {...product, quantity: 1 }]))
    }
    // showOrHideCart();
  }

  const removeFromCart = (product: Product): void => {
    setCarts(carts.filter(cart => cart.id !== product.id));
    // setProducts(findAndUpdate(product, data.products, false))
  }

  const incrementQuantity = (product: Product): void => {
    setCarts(updateQuantity(product, carts, "Add"));
  }

  const decrementQuantity = (product: Product): void => {
    if(product.quantity > 1) {
      setCarts(updateQuantity(product, carts, "Subtract"));
    } else {
      removeFromCart(product);
    }
  }

  const quantityCount = (): number => {
    let count = 0;
    carts.map(cart => {
      count += cart.quantity;
    });
    
    return count;
  }

  const showOrHideCart = (): void => {
    setToggleCart(!toggleCart);
  }

  const onChange = (e) => {
    setCurrency(e.target.value);
  }

  console.log({carts});

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
            onClick={showOrHideCart}
            role="button"
            onKeyDown={showOrHideCart}
            // eslint-disable-next-line jsx-a11y/tabindex-no-positive
            tabIndex={1}>
            <i className="fas fa-shopping-cart">&nbsp;&nbsp;{quantityCount()}</i></span>
        </div>
      </div>
      <div className="product-list">
        { !loading ? data.products.map((product) => 
          <ProductItem
          key={product.id}
          product={product}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          currency={currency}
          />) : <span>Loading.....</span>
        }
      </div>
      {
        toggleCart &&
        <CartList
          carts={carts}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          showOrHideCart={showOrHideCart}
          removeFromCart={removeFromCart}
          onChange={onChange}
          currency={currency}
        /> 
      }
    </>
  )
}

export default ProductList;
