<template>
    <div class="product-div">
        <h3>{{ product.name }}</h3>
        <span class="price-text">${{ product.price }} </span>
        <span v-if="product.in_stock" class="stock-text in-stock">Stock Available</span>
        <span v-else class="stock-text no-stock">Stock Not Available</span>
        <Button 
            :disabled = !product.in_stock
            @click="handleAddToCart(product.id, product.name, product.price)"
        >
            <template #ButtonText>
                ADD TO CART
            </template>
        </Button>
    </div>
</template>

<script setup lang="ts">
import Button from "../components/common/Button.vue"

import { ref, computed } from "vue";
import { storeToRefs } from "pinia";


import type { Ref, PropType } from "vue";
import type { Cart } from "../stores/cart.types.ts";
import type { Product } from "../stores/product.types.ts";

import { useCartStore } from "../stores/cart";


const cartStore = useCartStore();

const { cartItems } = storeToRefs(cartStore);
const { addToCart, increaseCartItemQuantity } = cartStore;

defineProps({
    product: {
        type: Object as PropType<Product>,
        required: true,
    }
});

const handleAddToCart = (id: number, name: string, price: number) => {

    const isExisted = computed(() => {
        let existedCartItem = cartItems.value.find((cartItem) => cartItem.id === id);
        if (existedCartItem) {
            return true;
        }
        return false
    });

    if (isExisted.value) {
        increaseCartItemQuantity(id);
        return;
    }

    let newCartItem: Ref<Cart> = ref({
        id,
        name,
        price,
        quantity: 1
    });

    addToCart(newCartItem.value);
}
</script>

<style scoped>
.product-div {
    padding: 1rem;
    border-radius: 12px;
    background-color: #cecece;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.price-text {
    font-weight: 600;
}

.stock-text {
    font-size: small;
    font-weight: 500;
}

.in-stock {
    color: #006400;
}

.no-stock {
    color: #f00;
}
</style>