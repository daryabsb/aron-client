<script setup>
import { ref, defineAsyncComponent } from "vue";
import { useUserStore } from "@/stores/user";
import { useIpcRenderer } from "@vueuse/electron";
import DashboardLayout from '@/dashboard/Layout.vue';
import Alert from "@/dashboard/provider/Alert.vue";


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
  <div class=" h-screen dark:bg-white  bg-zinc-800">

    <DashboardLayout>
      <Alert />
      <!-- <router-view /> -->
      <router-view />
    </DashboardLayout>
  </div>
</template>
