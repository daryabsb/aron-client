<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-sm bg-gray-800 border border-gray-500 px-2 pt-3 pb-2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:p-2"
              :class="`sm:max-w-${props.size}`">
              <div>
                <slot name="icon"></slot>

                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3">
                    <slot name="title"></slot>
                  </DialogTitle>
                  <div class="mt-2">
                    <slot name="content" @get-value="getValue"></slot>
                  </div>
                </div>
              </div>
              <div>
                <slot name="button"></slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, defineProps, inject, defineEmits } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
const props = defineProps({
  size: { type: String, default: "md" },
  open: { type: Boolean, default: false }
});

const emit = defineEmits(["getValue", "close"]);

const getValue = () => emit("getValue");
</script>
