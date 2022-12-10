<script setup>
import { useRoute } from "vue-router";

import StoreActionsBoard from "@/Orders/components/contents/StoreActionsBoard.vue";
import StoreHeader from "@/Orders/components/storeHeader/Index.vue";
import Modals from "@/dashboard/provider/Modals.vue";
const route = useRoute();
</script>
<template>
  <Modals />
  <div class="h-full pb-24 flext-grw grid grid-cols-12 grid-rows-10 gap-4">
    <div class="flex items-center col-span-12 row-span-2 lg:row-span-1 rounded-md bg-gray-700">
      <div class="w-full flex flex-col">
        <StoreHeader />
      </div>
    </div>
    <div
      class="hidden sm:block transition-all sm:col-span-6 xl:col-span-8 row-span-8 lg:row-span-9 p-2 rounded-md bg-gray-700 overflow-auto scrollbar">

      <StoreActionsBoard />
    </div>
    <div class="col-span-12 sm:col-span-6 xl:col-span-4 row-span-8 lg:row-span-9 px-1 rounded-md bg-gray-700">
      <router-view v-slot="{ Component }">
        <!-- <transition name="fade"> -->
        <component :is="Component" />
        <!-- </transition> -->
      </router-view>
    </div>
  </div>
</template>
