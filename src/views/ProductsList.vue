<template>
    <Header>
        <template #HeaderTitle>
            SHOPEE STORE
        </template>
    </Header>
    <section class="main-container">
        <div class="actions-div">
            <RouterLink :to="{ name: 'add_product' }">
                <Button class="add-btn">
                    <template #ButtonText>
                        ADD PRODUCT
                    </template>
                </Button>
            </RouterLink>
            <RouterLink :to="{ name: 'cart_items_list' }">
                <Button class="cart-btn">
                    <template #ButtonText>
                        GO TO CART
                    </template>
                </Button>
            </RouterLink>
        </div>
        <div v-if="products.length <= 0" class="empty-container">
            <h2>Your Cart is Empty !!</h2>
        </div>
        <ul v-else>
            <li v-for="product in products" :key="product.id">
                <ProductCard :product="product" />
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import Button from "../components/common/Button.vue"
import Header from "../components/common/Header.vue"
import ProductCard from "../components/ProductCard.vue"

import { storeToRefs } from "pinia";
import { useProductStore } from "../stores/product";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
console.log(products.value);
</script>

<style scoped>
.main-container {
    padding: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.main-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.actions-div{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
}

ul {
    padding: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
}

li {
    list-style-type: none;
}

:is(.add-btn, .cart-btn) {
    width: 120px;
}
</style>