<script setup>
import { defineProps } from 'vue';
defineProps({
    text: { type: String, required: true },
})

</script>
<template>
    <div class="flex items-center w-full h-32 relative border border-zinc-500 bg-transparent mt-1">
        <textarea :value="text" rows="5"
            class="block resize-none h-full w-full focus:outline-none border-0 bg-transparent font-light text-md  text-white"
            placeholder="Add your message..." @input="$emit('update:text', $event.target.value)" />

    </div>
</template>