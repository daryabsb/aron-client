<script setup>
import { ref, defineAsyncComponent } from "vue";
import { useUserStore } from "@/stores/user";
import { useIpcRenderer } from '@vueuse/electron'

const SignIn = defineAsyncComponent(() => import("@/components/SignIn.vue"))

const store = useUserStore();

const user = ref(null);
let pass = "root";
const data = { email: "root@root.com", password: pass };
const isLogin = ref(false)
const signIn = async () => {
  // store
  //   .signIn(data)
  //   .then((user.value = store.user))
  //   .catch((err) => console.log(err));
  isLogin.value = true
}

</script>
<template>
  <nav class="flex justify-center space-x-6 divide-x">
    <router-link to="/">Home</router-link>
    <router-link to="/about" class="px-6">About</router-link>
    <span v-if="store.isAuthenticated" class="px-6" @click="store.signOut">Sign out</span>
    <span v-else class="px-6" @click="signIn">Sign in</span>
  </nav>
  <SignIn v-model:isLogin="isLogin" />
  <Suspense>
    <pre>
      {{ store.useUser }}
    </pre>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  {{ store.isAuthenticated }}
  <router-view />
</template>


