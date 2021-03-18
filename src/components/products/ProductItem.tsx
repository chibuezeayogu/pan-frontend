import React from "react";
import  { Product }  from '../../types'
import { CURRENCY } from "../../util/index"

function ProductItem({
  product,
  addToCart,
  removeFromCart,
  currency
}:{ 
  product: Product; 
  addToCart: MouseEventHandler<HTMLButtonElement>; 
  removeFromCart: MouseEventHandler<HTMLButtonElement>;
  currency: string;
}): JSX.Element {
  return (
    <div className="product-item" key={product.id}>
      <div className="product-item__image">
        <img src={product.image_url} alt={product.title} />
      </div>
      <div className="product-item__title">{product.title}</div>
      <div>From <span className="product-item__price">{CURRENCY[currency]}{product.price}</span></div>
      <div className="product-item__btn">
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        {/* {
          product.addedToCart ?
          <button className="remove" onClick={() => removeFromCart(product)}>Remove from Cart</button> :
        } */}
      </div>
    </div>
  );
}

export default ProductItem;
