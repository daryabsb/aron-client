<script setup>
import { ref, defineAsyncComponent } from "vue";
import { useUserStore } from "@/stores/user";
import { useIpcRenderer } from "@vueuse/electron";
import DashboardLayout from '@/dashboard/Layout.vue';

const SignIn = defineAsyncComponent(() => import("@/components/SignIn.vue"));

const store = useUserStore();

const user = ref(null);
let pass = "root";
const data = { email: "root@root.com", password: pass };
const isLogin = ref(false);
const signIn = async () => {
  isLogin.value = true;
};
</script>
<template>
  <div class=" h-screen  bg-gray-900">


    <DashboardLayout>
      <!-- <router-view /> -->
      <router-view />
    </DashboardLayout>
  </div>
</template>
