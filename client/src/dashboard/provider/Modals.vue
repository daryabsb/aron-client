<script setup>
import { inject, defineAsyncComponent } from 'vue';

const openPayment = inject('openPayment');
const togglePayment = inject('togglePayment');

const PaymentModal = defineAsyncComponent(() => import("@/Orders/components/Modals/PaymentPopper.vue"))

</script>

<template>
  <!-- The overlay will only be visible on small screens to emphasize the focus on the side navigation when it is open.-->
  <!--  it also allows to close side navigation when you click outside-->
  <div>

    <PaymentModal v-if="openPayment" />

  </div>
</template>
