<script setup>
import { defineAsyncComponent } from "vue";
const TopNav = defineAsyncComponent(() =>
  import("@/components/Navbars/TopNav.vue")
);
</script>
<template>
  <div class="p-4">

    <router-view></router-view>

  </div>
</template>
