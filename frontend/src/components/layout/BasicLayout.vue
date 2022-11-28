<template>
    <main id="basicWrapper">

        <div id="topNav">
            <slot name="topNav"></slot>
        </div>

        <div class="basic-main">

            <div id="sideNav" class="h-full pr-4">
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
        @apply flex flex-col h-screen;
    }

    #basicWrapper .basic-main {
        @apply grow grid grid-cols-[17rem_1fr] p-8;
    }

    #basicWrapper .basic-content {
        @apply pl-8;
    }
</style>