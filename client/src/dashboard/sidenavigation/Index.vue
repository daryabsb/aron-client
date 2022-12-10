<script setup>
import { inject, ref } from "vue";
import SidenavItems from "./Items.vue";
import SidenavHeader from "./Header.vue";

defineProps({
  mobilePosition: {
    type: String,
    default: "",
  },
});

// const open = ref(false)
const open = inject("open");
// const toggle = inject('toggle');
const expand = inject("expand");
const shrink = inject("shrink");

const style = {
  left: "left-0 ",
  right: "right-0 lg:left-0",
};
</script>

<template>
  <aside class="top-0 h-screen bg-gray-900 text-white lg:absolute lg:z-40 lg:block" :class="[
    style[mobilePosition],
    open
      ? 'absolute duration-500 ease-in transition-all w-8/12 z-40 sm:w-5/12 md:w-64'
      : 'duration-700 ease-out hidden transition-all lg:w-24',
  ]">
    <div class="pb-32 lg:pb-12" @mouseenter="expand" @mouseleave="shrink">
      <SidenavHeader />
      <SidenavItems />
    </div>
  </aside>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
  width: 0;
  background: transparent;
  /* make scrollbar transparent */
}

.scrollbar {
  -ms-overflow-style: none;
  /* make scrollbar transparent on Firefox, IE and Edge*/
  scrollbar-width: none;
}
</style>
