<script setup>
import { useRoute, useRouter } from "vue-router";
import ProductList from "@/Orders/components/ProductList/Index.vue";
import StoreHeader from "@/Orders/components/storeHeader/Index.vue";
const route = useRoute();
console.log(useRouter());
</script>
<template>
  <div class="h-full pb-24 flext-grw grid grid-cols-12 grid-rows-10 gap-4 mx-2">
    <div class="flex items-center col-span-12 row-span-2 lg:row-span-1 rounded-md bg-gray-700">
      <div class="w-full flex flex-col">
        <StoreHeader />
      </div>
    </div>
    <div
      class="hidden sm:block transition-all sm:col-span-6 xl:col-span-8 row-span-8 lg:row-span-9 p-2 rounded-md bg-gray-700 overflow-auto scrollbar">
      <ProductList />
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
