<template>
  <div :class="`grid grid-rows-${rows} grid-cols-${cols} gap-${gap}`">
    <slot></slot>
  </div>
</template>

<script setup>

defineProps({
  rows: { type: [String, Number], required: true },
  cols: { type: [String, Number], required: true },
  gap: { type: [String, Number], default: 0 },
})

</script>
