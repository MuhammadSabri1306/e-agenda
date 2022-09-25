<template>
    <div id="wrapper">
        <slot name="topNav"></slot>
        <main class="grow bg-gray-100">
            <slot name="article"></slot>
            <slot name="toolBox"></slot>
        </main>
        <slot name="footer"></slot>
    </div>
</template>
<style scoped>
    #wrapper {
        @apply flex flex-col min-h-screen;
    }
</style>