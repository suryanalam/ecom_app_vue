<template>
    <div class="cart-item-div">
        <h3>{{ cartItem.name }}</h3>
        <span class="price-text">${{ cartItem.price }} </span>
        <div class="quantity-counter-div">Quantity:
            <span class="quantity-counter-wrapper">
                <Button class="quantity-counter-btn" @click="handleIncrementQuantity(cartItem.id)">
                    <template #ButtonText>
                        +
                    </template>
                </Button>
                <span class="quantity-text">{{ cartItem.quantity }}</span>
                <Button class="quantity-counter-btn" @click="handleDecrementQuantity(cartItem.id,cartItem.quantity)">
                    <template #ButtonText>
                        -
                    </template>
                </Button>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from "../components/common/Button.vue";

import type { PropType } from "vue"
import type { Cart } from "../stores/cart.types.ts"

import { useCartStore } from "../stores/cart";
const cartStore = useCartStore();
const { increaseCartItemQuantity, decreaseCartItemQuantity, removeFromCart } = cartStore;

defineProps({
    cartItem: {
        type: Object as PropType<Cart>,
        required: true
    }
});

const handleIncrementQuantity = (id: number) => {
    increaseCartItemQuantity(id);
}

const handleDecrementQuantity = (id: number, quantity: number) => {

    if(quantity > 1){
        decreaseCartItemQuantity(id);
    }else{
        removeFromCart(id);
    }

}

</script>

<style scoped>
.cart-item-div {
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

.quantity-text {
    font-size: large;
}

.quantity-counter-div,
.quantity-counter-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 600;
}

.quantity-counter-btn {
    padding: 0.25rem 0.5rem;
}
</style>