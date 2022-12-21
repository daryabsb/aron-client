<script setup>
import { defineProps } from 'vue';
defineProps({
    text: { type: String, required: true },
})

</script>
<template>
    <div class="flex items-center w-24 h-7 relative border border-zinc-500 bg-transparent mt-1">
        <input :value="text" type="text"
            class="h-full w-full border-0 bg-transparent font-light text-md flex items-center text-white"
            name="custom-input-number" @input="$emit('update:text', $event.target.value)" />
    </div>
</template>