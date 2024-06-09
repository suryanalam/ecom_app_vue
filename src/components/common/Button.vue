<template>
    <button type="button" class="btn">
        <slot name="ButtonText">DEFAULT TEXT</slot>
    </button>
</template>

<style scoped>
.btn {
    padding:0.5rem 0.75rem;
    border: none;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    color: var(--color-bg);
    border: 2px solid transparent;
    background-color: var(--color-text);
    transition: all 0.2s ease-in-out;
}

.btn:active{
    transform: scale(0.9);
}

.btn:disabled{
  cursor: not-allowed;
  opacity: 0.5;
}

.btn:disabled:hover{
    transform:none;
}
</style>