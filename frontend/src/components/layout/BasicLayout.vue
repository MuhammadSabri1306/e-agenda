<template>
    <main id="basicWrapper">

        <div id="topNav">
            <slot name="topNav"></slot>
        </div>

        <div class="container">

            <div id="sideNav" class="h-full">
                <slot name="sideNav"></slot>
            </div>

            <div class="basic-content">
                <slot name="main"></slot>
            </div>

        </div>

    </main>

    <footer id="footer">
        <slot name="footer"></slot>
    </footer>
</template>
<style>
    #basicWrapper {
        @apply flex flex-col min-h-screen;
    }

    #basicWrapper .container {
        @apply grow grid grid-cols-[17rem_1fr] p-8;
    }

    #basicWrapper .basic-content {
        @apply grid grid-cols-3 pl-8 gap-4 items-start;
    }
</style>