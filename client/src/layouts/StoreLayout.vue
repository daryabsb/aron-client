<script setup>
import { ref, defineAsyncComponent } from "vue";
import Grid from "@/components/shared/Grid.vue";

const TopNav = defineAsyncComponent(() =>
  import("@/components/Navbars/TopNav.vue")
);

const height = ref(850);
const width = ref(170);
const rows = ref("4");
const cols = ref("4");
const gap = ref("4");
</script>
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
