<script setup>
import { ref } from 'vue';
import Grid from '@/components/shared/Grid.vue';

// import Content from '../components/Content.vue';
const height = ref(850)
const width = ref(170)
const rows = ref("6")
const col = ref("6")
const gap = ref("6")
</script>

<template>
  <div class="flex flex-nowrap gap-4">
    <div :style="{ height: height + 'px', width: width + 'rem' }" class=" bg-gray-800 rounded-sm">
      <!-- <div class="h-16">A sample</div> -->
      <div class="flex">
        <Grid :cols="6" :rows="4" :gap="4">
          <button class="col-span-2   bg-pink-500 ">darya</button>
          <button class="col-span-3  bg-pink-500 ">Baram</button>


        </Grid>
      </div>
    </div>
    <div class="bg-gray-800 rounded-sm w-full">
      <h1 class="text-6xl text-pink-500">Your order aside</h1>
    </div>
  </div>
  <!-- <Content title="Home" /> -->
</template>
