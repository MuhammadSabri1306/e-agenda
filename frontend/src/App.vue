<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAccountStore } from "@/stores/account";
import { useOnlineState } from "@/modules/online-state";
import Toast from "@/components/ui/Toast.vue";
import AlertOffline from "@/components/AlertOffline.vue";

const accountStore = useAccountStore();
accountStore.readAccountCookie();

const router = useRouter();
router.beforeEach((to, from) => {
    const needLogin = [
        (to.meta.needAdminRole && !accountStore.isRoleAdmin),
        (to.meta.needOperatorRole && !accountStore.isRoleOperator),
        (to.meta.needLogin && accountStore.isRolePublic)
    ];

    if(needLogin.indexOf(true) >= 0)
        return { path: "/login", query: { redirect: to.fullPath } };
});

const isOnline = useOnlineState();
const showAlertOffline = computed(() => !isOnline.value);
// setTimeout(() => viewStore.showToast("Test aja", "Berhasil menghapus data.", true), 500)
</script>
<template>
    <router-view />
    <Toast />
    <AlertOffline v-if="showAlertOffline" />
</template>