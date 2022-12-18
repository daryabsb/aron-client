<script setup>
import { provide, ref, readonly, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const open = ref(false);
const openModal = ref(false);

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


const toggleModal = () => {
  openModal.value = !openModal.value
}

provide("toggleModal")

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
// console.log(process.env)

// DISCOUNT
const openDiscount = ref(false);
const toggleDiscount = () => {
  openDiscount.value = !openDiscount.value;
};
provide("openDiscount", readonly(openDiscount));
provide("toggleDiscount", toggleDiscount);


// CASH
const openManagement = ref(false);
const toggleManagement = () => {
  openManagement.value = !openManagement.value;
};
provide("openManagement", readonly(openManagement));
provide("toggleManagement", toggleManagement);

// ALERT
const showAlert = ref(false)
const alertStatus = ref("success")
const alertMessage = ref({
  header: "Successfully saved!",
  body: "Your request to the server was successfull!"
})
const closeAlert = () => showAlert.value = !showAlert.value
const toggleAlert = (status = "success", msg) => {
  alertStatus.value = status;
  if (msg && Object.keys(msg).length > 0) alertMessage.value = msg;
  showAlert.value = true

  setTimeout(() => {
    showAlert.value = false
  }, 3000)
}

provide("showAlert", showAlert)
provide("alertStatus", alertStatus)
provide("alertMessage", alertMessage)
provide("toggleAlert", toggleAlert)
provide("closeAlert", closeAlert)

</script>

<template>
  <slot />
</template>
