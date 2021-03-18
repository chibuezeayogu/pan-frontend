import { Product } from "../types";

export const findAndUpdate = (product: Product, products: Product[], value: boolean): Product[] => {
  const index = products.findIndex(p => p.id === product.id)
  const newProducts = [...products];
  if (index != -1) {
    newProducts[index] = {...product, addedToCart: value}
  }

  return newProducts;
}

export const updateQuantity = (product: Product, carts: Product[], value: string): Product[] => {
  const index = carts.findIndex(el => el.id === product.id)
  const newProducts = [...carts];
  const cartItem = newProducts[index];

  if(value == "Add") {
    newProducts[index] = {...cartItem, quantity: cartItem.quantity += 1}
  } else {
    newProducts[index] = {...cartItem, quantity: cartItem.quantity -= 1}
  }

  return newProducts;
}

export const updateCartPrice = (carts: Product[], products: Product[]): Product[] => {
  carts.map(cart => {
    const foundProduct = products.find(el => el.id === cart.id);
    cart.price = foundProduct.price
    return cart;
    // if(foundProduct) {
    // }
  });

  console.log({carts})

  return carts;
}

export const CURRENCY = {
  EUR: "€",
  USD: "$",
  CAD: "$",
  AUD: "$",
  GBP: "£",
  NGN: "₦",
  RUB: "₽",
}
