import React from "react";
import  { Product }  from '../../types'

const ProductItem = ({
  product,
  addToCart,
  currency
}:{ 
  product: Product,
  addToCart: (id: number) => void,
  currency: string
}): JSX.Element => (
  <div className="product-item" key={product.id}>
    <div className="product-item__image">
      <img src={product.image_url} alt={product.title} />
    </div>
    <div className="product-item__title">{product.title}</div>
    <div>From:&nbsp; 
      <span className="product-item__price">
        {currency} {product.price}
      </span>
    </div>
    <div className="product-item__btn">
      <button onClick={() => addToCart(product.id)}>Add to Cart</button>
    </div>
  </div>
);

export default ProductItem;
