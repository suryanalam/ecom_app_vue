<template>
    <header>
        <h2>
            <slot name="HeaderTitle">DEFAULT TITLE</slot>
        </h2>
    </header>
</template>

<style>
header {
    padding: 1rem 0;
    width: 100%;
    color: var(--color-bg);
    background-color: var(--color-text);
}

h2 {
    text-align: center;
}
</style>