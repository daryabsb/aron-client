<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
const store = useUserStore();

// const user = await assertTopicReference.signIn("root@root.com", "root");
const user = ref(null);
let pass = "root";
const data = { email: "root@root.com", password: pass.encode("ascii") };
store
  .signIn(data)
  .then((user.value = store.user))
  .catch((err) => console.log(err));

console.log("user", user);
</script>
<template>
  <nav class="flex justify-center space-x-6 divide-x">
    <router-link to="/">Home</router-link>
    <router-link to="/about" class="px-6">About</router-link>
  </nav>
  <Suspense>
    <pre>
      {{ user }}
    </pre>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  <router-view />
</template>
