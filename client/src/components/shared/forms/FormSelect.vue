<script setup>
import { defineProps } from 'vue';
defineProps({
    list: { type: Array, required: true },
    selected: { type: [String, Number], required: false }
})
</script>
<template>
    <div class="sm:col-span-2 ">
        <select
            class="block w-full max-w-lg text-white border-0 border-b border-gray-500 focus:outline-none sm:max-w-xs sm:text-sm bg-transparent">
            <option v-for="item in list" :key="item" :value="item" :selected="item === selected" class="bg-gray-500">{{
                    item
            }}</option>
        </select>
    </div>
</template>