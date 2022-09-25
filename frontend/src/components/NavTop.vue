<script setup>
import { ref, nextTick } from "vue";

const inputSearch = ref(null);
const isSearchFocus = ref(false);

const onBtnSearchClick = () => {
    if(!inputSearch.value)
        return;

    isSearchFocus.value = true;
    nextTick(() => inputSearch.value.focus());
};

const onInputSearchBlur = () => {
	const inputSearchElm = inputSearch.value;
	if(inputSearchElm.value.length < 1)
		isSearchFocus.value = false;
};

const animateBtnSettings = ref(false);
const onBtnSettingsClick = () => animateBtnSettings.value = !animateBtnSettings.value;
</script>
<template>
    <nav>
        <div class="flex">
            <div class="px-8 py-3 bg-black flex items-end">
                <h4 class="text-2xl text-primary-500 text-shadow-black font-bold">E-AGENDA</h4>
                <h6 class="text-lg text-gray-100 ml-2">DPRD SULSEL</h6>
            </div>
            <div class="pr-12 grow flex">
                <button class=" ml-auto text-xl px-4" :class="{ 'text-gray-700': isSearchFocus, 'text-gray-500 hover:text-gray-700': !isSearchFocus }" @click="onBtnSearchClick">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </button>
                <Transition name="width-transition">
                    <div v-show="isSearchFocus" class="grid grid-cols-1 pr-4 w-[20rem] lg:w-[30rem]">
                        <input ref="inputSearch" type="search" class="w-full text-lg text-gray-600 bg-gray-100" placeholder="Search..." @blur="onInputSearchBlur">
                    </div>
                </Transition>
                <button class="text-gray-600 rounded-full text-[2.25rem] my-auto px-4">
                    <font-awesome-icon icon="fa-solid fa-circle-user" />
                </button>
                <button class="text-gray-600 rounded-full text-xl my-auto px-4" @click="onBtnSettingsClick">
                    <font-awesome-icon icon="fa-solid fa-gear" :class="{ 'fa-spin': animateBtnSettings }" />
                </button>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .width-transition-enter-active,
    .width-transition-leave-active {
        transition: padding-right .6s ease-in-out,
            width .6s ease-in-out;
    }

    .width-transition-enter-from,
    .width-transition-leave-to {
        @apply pr-0 w-0;
    }
</style>