import React from "react";
import  { Product }  from '../../types'
import { CURRENCY } from "../../util/index"

const ProductItem = ({
  product,
  addToCart,
  currency
}:{ 
  product: Product; 
  addToCart: MouseEventHandler<HTMLButtonElement>;
  currency: string;
}): JSX.Element => (
  <div className="product-item" key={product.id}>
    <div className="product-item__image">
      <img src={product.image_url} alt={product.title} />
    </div>
    <div className="product-item__title">{product.title}</div>
    <div>From <span className="product-item__price">{CURRENCY[currency]}{product.price}</span></div>
    <div className="product-item__btn">
      <button onClick={() => addToCart(product.id)}>Add to Cart</button>
    </div>
  </div>
);

export default ProductItem;
