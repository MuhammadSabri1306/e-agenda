<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import BasicLayout from "./components/layout/BasicLayout.vue";
import NavTop from "./components/NavTop.vue";
import NavSide from "./components/NavSide.vue";

const route = useRoute();

const basicLayoutViews = ["agenda"];
const isUseBasicLayout = computed(() => basicLayoutViews.indexOf(route.name) >= 0);
</script>
<template>
    <div v-if="isUseBasicLayout" class="bg-gray-100">
        <BasicLayout>
            <template #topNav>
                <NavTop class="bg-white shadow-sm" />
            </template>

            <template #sideNav>
                <a href="#" class="mt-8 bg-primary-700 hover:bg-primary-800 h-12 rounded-3xl shadow mb-4 flex">
                    <h4 class="text-xl text-white text-shadow-black font-bold m-auto">E-AGENDA</h4>
                </a>
                <NavSide class="basic-card mb-4" />
                <div class="basic-card p-10 hidden">
                    <img src="/assets/img/logo-pemprov-sulsel.webp">
                </div>
            </template>
            
            <template #main>
                <router-view />
            </template>

        </BasicLayout>
    </div>
    <div class="v-else">
        <router-view />
    </div>
</template>