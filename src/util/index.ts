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
