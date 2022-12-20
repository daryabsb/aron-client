<template>
  <div class="mt-1 sm:col-span-2 sm:mt-0">
    <div class="flex-shrink-0">
      <Switch
        :class="[
        checked
          ? 'bg-green-600'
          : 'bg-zinc-500',
        'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-sm border-1 border-transparent transition-colors duration-200 ease-in-out ']">
        <span
          :class="[checked ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 transform rounded-sm bg-white shadow ring-0 transition duration-200 ease-in-out']" />
      </Switch>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { Switch } from '@headlessui/vue'

defineProps({
  checked: {
    type: Boolean,
    required: false,
    default: false,
  },
})

</script>
