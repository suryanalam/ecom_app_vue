import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

import type { Ref } from "vue";
import type { Cart } from "../stores/cart.types.ts";

export const useCartStore = defineStore("Cart", () => {
  //Toast Instance
  const toast = useToast();
  
  //states
  const cartItems: Ref<Cart[]> = ref([]);

  //getters
  const totalAmount = computed(() => {
    const total_amount = cartItems.value.reduce((acc, cartItem)=>{
      return acc + (cartItem.quantity * cartItem.price);
    }, 0);

    console.log(total_amount);
    return total_amount;
  });

  //actions
  const addToCart = (cartItem: Cart) => {
    cartItems.value.push(cartItem);
    toast.success("Item added to cart successfully!!");
  };

  const removeFromCart = (id: number) => {
    const updatedCartItems = cartItems.value.filter(
      (cartItem) => cartItem.id !== id
    );
    cartItems.value = updatedCartItems;
    toast.success("Item removed from cart successfully!!");
  };

  const increaseCartItemQuantity = (id: number) => {
    const cartItem = cartItems.value.find((cartItem) => cartItem.id === id);
    if (cartItem?.quantity) {
      cartItem.quantity++;
      toast.success("Item quantity increased successfully!!");
    } else {
      toast.warning("Item quantity not increased!!");
      return;
    }
  };

  const decreaseCartItemQuantity = (id: number) => {
    const cartItem = cartItems.value.find((cartItem) => cartItem.id === id);
    if (cartItem?.quantity) {
      cartItem.quantity--;
      toast.success("Item quantity decreased successfully!!");
    } else {
      toast.warning("Item quantity not decreased");
      return;
    }
  };

  return {
    cartItems,
    totalAmount,
    addToCart,
    removeFromCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  };
});
