<script setup>
import { provide, ref, readonly, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const open = ref(false);

const route = useRoute();

const toggle = () => {
  open.value = !open.value;
};

const expand = () => {
  open.value = true;
};
const shrink = () => {
  open.value = false;
};

// set the html tag style overflow to hidden.
onMounted(() => {
  document.documentElement.style.overflow = "hidden";
});

// close side navigation when you click on a sidenav item or when route changes.
watch(route, () => {
  if (open.value) {
    open.value = false;
  }
});

provide("open", readonly(open));
provide("toggle", toggle);
provide("expand", expand);
provide("shrink", shrink);

// modals provide
// PAYMENT
const openPayment = ref(false);
const togglePayment = () => {
  openPayment.value = !openPayment.value;
};
provide("openPayment", readonly(openPayment));
provide("togglePayment", togglePayment);

// CASH
const openCash = ref(false);
const toggleCash = () => {
  openCash.value = !openCash.value;
};
provide("openCash", readonly(openCash));
provide("toggleCash", toggleCash);

// DISCOUNT
const openDiscount = ref(false);
const toggleDiscount = () => {
  openDiscount.value = !openDiscount.value;
};
provide("openDiscount", readonly(openDiscount));
provide("toggleDiscount", toggleDiscount);

</script>

<template>
  <slot />
</template>
