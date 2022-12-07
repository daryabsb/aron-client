<script setup>
import { defineAsyncComponent } from "vue";
const TopNav = defineAsyncComponent(() =>
  import("@/components/Navbars/TopNav.vue")
);
</script>
<template>
  <div class="flex h-screen inset-0 hide-print">
    <div class="flex flex-1 inset-0 flex-col overflow-hidden">
      <TopNav />

      <router-view></router-view>
    </div>
  </div>
</template>
