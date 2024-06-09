import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

import type { Ref } from "vue";
import type { Product } from "../stores/product.types";

export const useProductStore = defineStore("Product", () => {
  // Toast Instance
  const toast = useToast();

  //states
  const products: Ref<Product[]> = ref([]);
  products.value = [
    {
      id: 1,
      name: "mac m1",
      price: 50,
      in_stock: true,
    },
    {
      id: 2,
      name: "mac m2",
      price: 200,
      in_stock: true,
    },
    {
      id: 3,
      name: "mac m3",
      price: 100,
      in_stock: false,
    },
    {
      id: 4,
      name: "mac ipad",
      price: 99,
      in_stock: true,
    },
  ]

  //actions
  const addProduct = (product: Product) => {
    products.value.push(product);
    toast.success("Product added successfully!!");
  };

  const removeProduct = (id: number) => {
    const updatedProducts = products.value.filter((product) => product.id !== id);
    products.value = updatedProducts;
    toast.success("Product deleted successfully!!");
  };

  //getters
  const availableProducts = computed(() => {
    return [...products.value].filter((product) => product.in_stock);
  });

  return { products, availableProducts, addProduct, removeProduct };
});
