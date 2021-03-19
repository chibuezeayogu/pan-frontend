import { Product } from "../types";

export const updateQuantity = (productId: number, carts: Product[], value: string): Product[] => {
  const index = carts.findIndex(el => el.id === productId)
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
    const price = foundProduct?.price
    cart.price = price;
    return cart;
  });

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
