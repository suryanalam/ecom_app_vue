<template>
    <Header>
        <template #HeaderTitle>
            CART ITEMS
        </template>
    </Header>
    <section class="main-container">
        <div class="actions-div">
            <RouterLink :to="{ name: 'products_list' }">
                <Button class="products-btn">
                    <template #ButtonText>
                        GO TO PRODUCTS
                    </template>
                </Button>
            </RouterLink>
        </div>
        <div v-if="cartItems.length <= 0" class="empty-container">
            <h2>Your Cart is Empty !!</h2>
        </div>
        <div v-else class="cart-content-container">
            <ul>
                <li v-for="cartItem in cartItems" :key="cartItem.id">
                    <CartItemCard :cartItem="cartItem" />
                </li>
            </ul>
            <div class="items-billing-div">
                <h3 class="items-billing-title">Order Summary</h3>
                <div class="billing-content-div">
                    <div class="billing-content-row">
                        <span>No. of Items: </span>
                        <span><b>{{ cartItems.length }}</b></span>
                    </div>
                    <div class="billing-content-row">
                        <span>Order Amount: </span>
                        <span><b>{{ totalAmount }}</b></span>
                    </div>
                    <div class="billing-content-row">
                        <span>Delivery Charges: </span>
                        <span><b>{{ delivery_charges }}</b></span>
                    </div>
                    <div class="billing-content-row">
                        <span>Added Discount: </span>
                        <span><b>{{ discount }}</b></span>
                    </div>
                    <hr />
                    <div class="billing-content-row">
                        <span>Total price: </span>
                        <span><b>{{ total_price }}</b></span>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Button from "../components/common/Button.vue"
import Header from "../components/common/Header.vue"
import CartItemCard from "../components/CartItemCard.vue"

import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();

const { cartItems, totalAmount } = storeToRefs(cartStore);
console.log(cartItems.value);

const delivery_charges = computed((): number => {
    return Number(((totalAmount.value / 100) * 10).toFixed(2));
});

const discount = computed((): number => {
    return Number(((totalAmount.value / 100) * 5).toFixed(2));
});

const total_price = computed((): number => {
    return Number(
        ((totalAmount.value - delivery_charges.value) + discount.value)
            .toFixed(2)
    );
});

</script>

<style scoped>
.main-container {
    padding: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.main-container .actions-div {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.products-btn {
    width: 140px;
}

.empty-container {
    width: 100%;
    height: 80dvh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cart-content-container {
    width: 100%;
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    justify-content: space-between;
}

ul {
    padding: 0;
    width: 65%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
}

li {
    list-style-type: none;
}

.items-billing-div {
    padding: 1.5rem 2rem;
    width: 30%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    border-radius: 12px;
    background-color: #cecece;
}

.billing-content-div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.billing-content-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.items-billing-title {
    position: relative;
}

.items-billing-title::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background-color: var(--color-text);
}

hr {
    border: 1px solid rgba(22, 22, 22, 0.25);
}
</style>