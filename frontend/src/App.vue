<script setup>
import { useRouter } from "vue-router";
import { useAccountStore } from "@/stores/account";
// import { useViewStore } from "@/stores/view";
import Toast from "@/components/ui/Toast.vue";

const accountStore = useAccountStore();
accountStore.readAccountCookie();

const router = useRouter();
router.beforeEach((to, from) => {
    const needLogin = [
        (to.meta.needAdminRole && !accountStore.isRoleAdmin),
        (to.meta.needOperatorRole && !accountStore.isRoleOperator),
        (to.meta.needMemberRole && !accountStore.isRoleMember),
        (to.meta.needLogin && !accountStore.isRolePublic)
    ];

    if(needLogin.indexOf(true) >= 0)
        return { path: "/login", query: { redirect: to.fullPath } };
});

// const viewStore = useViewStore();
// setTimeout(() => viewStore.showToast("Test aja", "Berhasil menghapus data.", true), 500)
</script>
<template>
    <router-view />
    <Toast />
</template>