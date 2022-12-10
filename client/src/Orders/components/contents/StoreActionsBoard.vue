<script setup>
import { ref, computed, onMounted, onUpdated, defineAsyncComponent } from "vue";
import axios from "axios";
import ordersAPI from "@/services/ordersAPI";
import OrderItem from "@/Orders/orderTemplates/OrderItem";
import { useUser } from "@/Users/userStore";
import NumericPad from "@/components/shared/calculator/NumericPad.vue";

import productsGroupsAPI from "@/services/productsGroupsAPI";
import { useOrderStore } from "@/Orders/ordersStore";
import {
  priceFormat,
  numberFormat,
  loadUserData,
} from "@/Orders/orderComposables";

const store = useOrderStore();
const userStore = useUser();
const addToCart = store.addToCart;

const SingleGroupBox = defineAsyncComponent(() =>
  import("@/Orders/components/contents/SingleGroupBox.vue")
);

const productGroups = ref([]);
const selectedGroupProducts = ref([]);

const ids = ref([]);

const loadProductGroups = async () => {
  try {
    const response = await productsGroupsAPI.getProductGroups();
    productGroups.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
onMounted(async () => {
  await loadProductGroups();
  if (!userStore.user) await loadUserData();
});
const id = computed(() => ids.value[ids.value.length - 1]);

const loadProductsByGroupId = async () => {
  try {
    if (id.value) {
      const response = await productsGroupsAPI.filterGroups(id.value);
      selectedGroupProducts.value = response.data;
    } else return;
  } catch (error) {
    console.log(error);
  }
};
const selectGroup = async (groupId) => {
  // if (id.value) id.value = 0;
  ids.value.push(groupId);

  await loadProductsByGroupId();
};
const removeId = async () => {
  ids.value.splice(-1);
  await loadProductsByGroupId();
};

const isNumpadOpen = ref(false);
const isCheckPriceOpen = ref(false);
const isDefaultQtyOpen = ref(false);
const isTaxInclusiveOpen = ref(false);
const order = ref(null);

const close = () => (isNumpadOpen.value = false);

// PREPARE PRODUCT TO ORDER
const generateItemNumber = async () => {
  try {
    const numberResponse = await ordersAPI.getNumber("item");
    console.log("check number Response", numberResponse.data);
    return numberResponse.data;
  } catch (error) {
    console.log(error);
  }
};
// 1. Add the clicked item to the created OrderItem
const createOrder = async (item) => {
  // HERE NEED TO BE CHECKED

  const number = await generateItemNumber();
  order.value = new OrderItem(
    item,
    `${number}`,
    store.activeNumber,
    userStore.user.id
  );

  checkPrice(item);
  return;
};

// 2. Check the change price on the product

const checkPrice = (item) => {
  if (item.is_price_change_allowed) {
    isCheckPriceOpen.value = true;
    return;
  } else {
    checkQuantiy();
  }
};

// 3. Get the price and proceed with checkQuantity
const getPrice = (value) => {
  order.value.price = value;
  isCheckPriceOpen.value = false;
  checkQuantiy();
};

// 4. Check the is default quantity on the item
const checkQuantiy = () => {
  // console.log(order.value);
  // return;
  if (!order.value.product.is_using_default_quantity) {
    isDefaultQtyOpen.value = true;
    return;
  } else {
    // checkTaxInclusivePrice()
    addProductToCart();
  }
};
// 5. Get the quantity and proceed
const getQuantity = async (value) => {
  order.value.quantity = value;
  isDefaultQtyOpen.value = false;
  // checkTaxInclusivePrice()
  addProductToCart();
};
// 4. CHECK TAX TO BE ADDED LATER
const checkTaxInclusivePrice = () => {
  console.log("Tax Done");
};
// 5. Dispatch the order to cart =>>

const addProductToCart = () => {
  addToCart(order);
  // order = null;
};
const getValue = (value) => {
  console.log(value);
  close();
};

const selectItem = (item) => {
  ids.value.push(item.number);
  loadProductsByGroupId();
};
const data = [
  {
    style: {
      background: "bg-yellow-200",
      progressbar: "bg-yellow-700",
      text: "text-yellow-600",
    },
    info: {
      date: "December 10, 2020",
      title: "Web Designing",
      subtitle: "Prototyping",
      progress: "90%",
      timeLeft: "2 Days Left",
      participants: [
        {
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
        },
        {
          image:
            "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
        },
      ],
    },
  },

];
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3">
    <template v-if="ids.length === 0">
      <SingleGroupBox v-for="(group, index) in productGroups" :key="index" :item="group"
        @select-item="selectGroup(group.id)" />
    </template>
    <template v-else>
      <SingleGroupBox :item="selectedGroupProducts" :is-back="true" @back="removeId"
        @select-item="selectGroup(group.id)" />
      <SingleGroupBox v-for="product in selectedGroupProducts" :key="product.id" :item="product"
        @add-to-cart="createOrder(product)" @back="removeId" @select-item="selectGroup(product.id)" />
    </template>
  </div>
</template>
