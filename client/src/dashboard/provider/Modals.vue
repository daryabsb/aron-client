<script setup>
import { inject, defineAsyncComponent } from "vue";
// import { getEvt } from "@/Orders/orderComposables";
import PaymentModal from "@/Orders/components/Modals/PaymentPopper.vue";
import CashModal from "@/Orders/components/Modals/CashPopper.vue";
import DiscountModal from "@/Orders/components/DiscountBoard/Index.vue"

const togglePayment = inject("togglePayment");
const toggleCash = inject("toggleCash");
const toggleDiscount = inject("toggleDiscount");

// const trigger = {
//   payment: togglePayment(),
//   cash: toggleCash(),
//   discount: toggleDiscount(),
// }

// window.onkeydown = (evt) => {
//   return getEvt(evt.key, trigger)();
// };


const openPayment = inject("openPayment");
const openCash = inject("openCash");
const openDiscount = inject("openDiscount");
</script>

<template>
  <!-- The overlay will only be visible on small screens to emphasize the focus on the side navigation when it is open.-->
  <!--  it also allows to close side navigation when you click outside-->
  <div>
    <PaymentModal :open="openPayment" />
    <CashModal :open="openCash" />
    <DiscountModal :open="openDiscount" />
  </div>
</template>
