<template>
  <!-- <div :class="`grid grid-rows-${rows} grid-cols-${cols} gap-${gap}`"> -->
  <div
    :class="[
      'grid',
      ` grid-rows-${props.rows} grid-cols-${props.cols} gap-${props.gap}`,
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  rows: { type: [String, Number], required: true },
  cols: { type: [String, Number], required: true },
  gap: { type: [String, Number], default: 0 },
});
</script>
