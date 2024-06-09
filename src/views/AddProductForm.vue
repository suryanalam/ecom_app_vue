<template>
    <Header>
        <template #HeaderTitle>
            ADD A NEW PRODUCT
        </template>
    </Header>
    <div class="form-container">
        <form id="form" @submit.prevent="onSubmit">
            <div class="form_group">
                <label for="name">Name: </label>
                <input type="text" name="name" placeholder="Ex: Iphone 13 pro" v-model="formData.name">
            </div>
            <div class="form_group">
                <label for="price">Price: </label>
                <input type="number" name="price" placeholder="Ex: 500" v-model="formData.price">
            </div>
            <div class="form_group">
                <label for="in_stock">Stock Available: </label>
                <select name="in_stock" v-model="formData.in_stock">
                    <option value="null">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div class="form_actions_div">
                <RouterLink :to="{ name: 'products_list' }">
                    <Button>
                        <template #ButtonText>
                            Go Back
                        </template>
                    </Button>
                </RouterLink>
                <Button type="submit">
                    <template #ButtonText>
                        Submit
                    </template>
                </Button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";

import Button from "../components/common/Button.vue"
import Header from "../components/common/Header.vue"

import { generateId } from "../utils/generateId"
import { useProductStore } from "../stores/product";

const toast = useToast();

const productStore = useProductStore();
const { addProduct } = productStore;

let formData = ref({
    name: null,
    price: null,
    in_stock: null
});

let stock_status = computed(() => {
    return formData.value.in_stock === "true" ? true : false;
})

const onSubmit = () => {

    if (!formData.value.name || !formData.value.price || !formData.value.in_stock) {
        toast.error("All fields are required to fill!!");
        return;
    }

    let data = {
        id: generateId(),
        name: String(formData.value.name),
        price: Number(formData.value.price),
        in_stock: stock_status.value
    }

    addProduct(data);

    formData.value = {
        name: null,
        price: null,
        in_stock: null
    };
}
</script>

<style scoped>
.form-container {
    padding: 3rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
}

form {
    padding: 2rem;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #cecece;
    border-radius: 12px;
}

.form_group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.5rem;
}

.form_actions_div {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
}

label {
    font-size: 0.75rem;
    font-weight: 600;
}

input,
select {
    padding: 0.5rem;
    width: 100%;
    font-weight: 500;
    font-size: 0.75rem;
    outline: none;
    border-radius: 6px;
    border: 1.5px solid var(--color-text);
    background-color: transparent;
}

select option {
    background-color: #cecece;
}

input[type=number] {
    appearance: textfield;
    -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>