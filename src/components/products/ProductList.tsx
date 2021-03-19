import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import ProductItem from "./ProductItem";
import { Product }  from '../../types'
import { updateQuantity, updateCartPrice } from "../../util/index"
import { LOAD_PRODUCTS } from "../../graphQL/Queries"
import CartList from "../cart/CartList";

const ProductList = (): JSX.Element => {
  const [currency, setCurrency] = useState<string>("NGN");
  const { error, loading, data } = useQuery(LOAD_PRODUCTS, { variables: { currency: currency }, fetchPolicy: "no-cache"});
  const [carts, setCarts] = useState<Product[]>([]);
  const [toggleCart, setToggleCart] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setCarts(updateCartPrice(carts, data.products));
    }
  }, [carts, data]);


 const addToCart = (productId: number): void => {
    const cartItem = data.products.find(el => el.id == productId);
    const index = carts.findIndex(el => el.id === cartItem.id);

    if (index !== -1) {
      setCarts(updateQuantity(productId, carts, "Add"));
    } else {
      setCarts(prevState => ([...prevState, { ...cartItem, quantity: 1 }]));
    }
    // showOrHideCart();
  }

  const removeFromCart = (prodcutId: number): void => {
    setCarts(carts.filter(cart => cart.id !== prodcutId));
  }

  const incrementQuantity = (productId: number): void => {
    setCarts(updateQuantity(productId, carts, "Add"));
  }

  const decrementQuantity = (productId: number, productQuantity: number): void => {
    if(productQuantity > 1) {
      setCarts(updateQuantity(productId, carts, "Subtract"));
    } else {
      removeFromCart(productId);
    }
  }

  const quantityCount = (): number => {
    let count = 0;
    carts.map(cart =>  {
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

  console.log("================cats", carts);
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
