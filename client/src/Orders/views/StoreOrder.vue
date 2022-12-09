<script setup>
import { useRoute } from "vue-router";
import StoreActionsBoard from "@/Orders/components/contents/StoreActionsBoard.vue";
import StoreHeader from "@/Orders/components/storeHeader/Index.vue";
const route = useRoute();
console.log(route);
</script>
<template>
  <div class="h-[55em] flext-grw grid grid-cols-12 grid-rows-10 gap-4">
    <div
      class="flex items-center col-span-12 row-span-1 rounded-md bg-gray-700"
    >
      <div class="w-full flex flex-col">
        <StoreHeader />
      </div>
    </div>
    <div
      class="col-span-8 xl:col-span-9 row-span-9 p-2 rounded-md bg-gray-700 overflow-auto scrollbar"
    >
      <StoreActionsBoard />
    </div>
    <div class="col-span-4 xl:col-span-3 row-span-9 p-2 rounded-md bg-gray-700">
      <router-view v-slot="{ Component }">
        <!-- <transition name="fade"> -->
        <component :is="Component" />
        <!-- </transition> -->
      </router-view>
    </div>
  </div>
</template>
