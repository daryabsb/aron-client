<script setup>
import { provide, ref, readonly, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const open = ref(false);
const openPayment = ref(false)
const route = useRoute();

const toggle = () => {
  open.value = !open.value;
};
const togglePayment = () => {
  openPayment.value = !openPayment.value;
};

const expand = () => {
  open.value = true;
};
const shrink = () => {
  open.value = false;
};

// set the html tag style overflow to hidden.
onMounted(() => {
  document.documentElement.style.overflow = 'hidden';
});

// close side navigation when you click on a sidenav item or when route changes.
watch(route, () => {
  if (open.value) {
    open.value = false;
  }
});

provide('open', readonly(open));
provide('toggle', toggle);
provide('expand', expand);
provide('shrink', shrink);

// modals provide
// PAYMENT
provide("openPayment", readonly(openPayment))
provide("togglePayment", togglePayment)
</script>

<template>
  <slot />
</template>
