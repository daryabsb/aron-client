<template>
  <div class="flex flex-row w-full h-20 rounded-sm border my-2" :class="[borderColor]">
    <div class="relative" :class="bgColor">
      <span class="flex justify-center items-center mx-3 h-full">
        <span class="flex justify-center items-center text-white border border-white rounded-full">
          <InformationCircleIcon class="w-10 h-10" />
        </span>
      </span>
    </div>
    <div class="ml-3 p-1 text-sm">
      <p class="text-white">
        {{ tip }}
      </p>
      <p class="text-sky-500 cursor-pointer">{{ link }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref, refdefineProps } from "vue";
import { InformationCircleIcon } from '@heroicons/vue/24/solid'
const props = defineProps({
  tip: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
    default: "Learn more",
  },
  color: {
    type: String,
    required: false,
    default: "sky",
  },
})

const bgColor = ref("bg-" + props.color + "-" + 500);
const borderColor = ref("border-" + props.color + "-" + 500);


</script>
