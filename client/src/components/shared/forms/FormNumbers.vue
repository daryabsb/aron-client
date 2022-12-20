<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    number: { type: Number, required: true },
})
defineEmits(['change'])

</script>
<template>

    <div class="flex items-center w-24 h-7 relative border border-zinc-500 bg-transparent mt-1">
        <button
            class="flex text-sm font-light mt-1 items-center bg-transparent border-r border-zinc-500 text-white hover:text-zinc-500 h-full w-full rounded-l cursor-pointer "
            @click.prevent="$emit('change', -1)">
            <!-- @click.prevent="updateNumber(-1, $emit)" -->
            <span class="mb-1 mx-auto text-2xl font-thin">−</span>
        </button>
        <input :value="number" type="number"
            class="h-full w-10 border-0 bg-transparent font-light text-md flex items-center text-white"
            name="custom-input-number" />
        <button
            class="flex text-sm font-light mt-1 items-center bg-transparent text-white hover:text-zinc-500  h-full w-full rounded-r border-l border-zinc-500 cursor-pointer"
            @click.prevent="$emit('change', 1)">
            <span class="mb-1 mx-auto text-2xl font-thin">+</span>
        </button>
    </div>

</template>