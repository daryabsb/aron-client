<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-50" @close="togglePayment">
      <!-- <Dialog as="div" class="relative z-10" @close="togglePayment"> -->
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full min-w-screen items-end justify-center p-2 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative bg-gray-800 sm:max-w-full transform overflow-hidden rounded-sm border border-gray-500 text-left shadow-xl transition-all">
              <div>


                <div class="text-center w-full border-2 border-blue-800">

                  <div>
                    <div class="inset-0 h-full w-full flex items-center text-white">
                      <!-- ITEMS AT PAYMENT MODAL -->
                      <div class="inset-0 space-y-0 divide-x divide-gray-500 flex">
                        <div v-if="isShowItems" class="inset-0 h-full text-center bg-transparent text-white">
                          <!-- <div class="w-full h-full bg-aronium-700 border-r border-aronium-500"> -->
                          <div class="h-16 w-full text-left bg-gray-900 p-2 border-b border-r border-gray-500">
                            <h1 class="text-2xl font-light tracking-wider">
                              Items
                            </h1>
                          </div>
                          <div class="w-full h-full bg-gray-700 text-left p-3">
                            <!-- ITEMS HERE -->

                            <RadioGroup v-model="selectedOrderItem">
                              <RadioGroupLabel class="sr-only">
                                Pricing plans
                              </RadioGroupLabel>
                              <div class="relative -space-y-px rounded-sm border-b border-gray-500">
                                <RadioGroupOption as="template" v-for="(item, itemIdx) in store.useActiveOrder
                                .items" :key="item" :value="item" v-slot="{ checked, active }">
                                  <div :class="[
                                    itemIdx === 0
                                      ? 'rounded-tl-sm rounded-tr-sm'
                                      : '',
                                    itemIdx ===
                                      store.useActiveOrder.items.length - 1
                                      ? 'rounded-bl-sm rounded-br-sm'
                                      : '',
                                    checked
                                      ? 'bg-pink-50 border-pink-400 z-10'
                                      : 'border-gray-500',
                                    'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none',
                                  ]">
                                    <span class="flex items-center text-sm">
                                      <span :class="[
                                        checked
                                          ? 'bg-indigo-600 border-transparent'
                                          : 'bg-white border-gray-300',
                                        active
                                          ? 'ring-1 ring-offset-2 ring-pink-500'
                                          : '',
                                        'h-4 w-4 rounded-full border flex items-center justify-center',
                                      ]" aria-hidden="true">
                                        <span class="rounded-full w-1.5 h-1.5" />
                                      </span>
                                      <RadioGroupLabel as="span" :class="[
                                        checked
                                          ? 'text-gray-900'
                                          : 'text-gray-white',
                                        'ml-3 font-medium',
                                      ]">{{
    item.product.name
}}</RadioGroupLabel>
                                    </span>
                                    <RadioGroupDescription as="span" class="pl-1 text-sm md:ml-0 md:pl-0 md:text-right">
                                      <span :class="[
                                        checked
                                          ? 'text-gray-900'
                                          : 'text-white',
                                        'font-medium',
                                      ]">{{
    priceFormat(item.product.price)
}}</span>
                                      {{ " " }}
                                      <!-- <span
                                        :class="
                                          checked
                                            ? 'text-indigo-700'
                                            : 'text-gray-500'
                                        "
                                        >(${{ plan.priceYearly }} / yr)</span
                                      > -->
                                    </RadioGroupDescription>
                                    <RadioGroupDescription as="span" :class="[
                                      checked
                                        ? 'text-gray-700'
                                        : 'text-white',
                                      'ml-2 pl-1 text-sm md:ml-0 md:pl-0 md:text-right',
                                    ]">remove</RadioGroupDescription>
                                  </div>
                                </RadioGroupOption>
                              </div>
                            </RadioGroup>

                            <!-- ITEMS END -->
                          </div>
                          <!-- </div> -->
                        </div>

                        <div class="relative text-center bg-transparent text-white"
                          :class="isShowItems ? 'w-4/5' : 'w-full'">
                          <div
                            class="h-16 w-full flex justify-between text-left bg-gray-900 p-2 border-b border-gray-500">
                            <h1 class="text-2xl">Actions</h1>
                            <span @click="showItems">
                              <i :class="
                                isShowItems ? 'fa fa-times' : 'fa fa-circle'
                              "></i>
                            </span>
                          </div>

                          <div class="w-full h-full bg-gray-700 border-b border-r border-gray-500 text-left p-3">
                            <div class="relative flex items-center justify-between w-full h-12 bg-inherit">
                              <div class="flex items-center h-full">
                                <button class="bg-red-600 py-4 px-12" @click="togglePayment">
                                  <span><i class="fa fa-times"></i></span>
                                  Cancel
                                </button>
                              </div>
                              <div class="flex items-center h-full">
                                <button class="flex bg-inherit border border-gray-500 py-4 px-12 mr-1"
                                  @click="store.openOrderDiscountModal = true">
                                  <span class="mr-2"><i class="fa fa-percent"></i></span>
                                  Discount
                                </button>
                                <button class="flex bg-inherit border border-gray-500 py-4 px-12 mr-1"
                                  @click="togglePayment">
                                  <span class="mr-2"><i class="fa fa-layer-group"></i></span>
                                  Rounds
                                </button>
                                <button class="flex bg-inherit border border-gray-500 py-4 px-12"
                                  @click="togglePayment">
                                  <span class="mr-2"><i class="fa fa-user"></i></span>
                                  Customer
                                </button>
                              </div>
                            </div>
                            <div class="flex">
                              <div class="flex flex-col items-start h-full w-30 mt-3 mr-3">
                                <h1 class="mb-3 text-xl font-light">
                                  Payment Type
                                </h1>
                                <button v-for="t in store.usePaymentTypes" :key="t.ordinal"
                                  class="flex bg-inherit border border-gray-500 py-4 w-44 justify-center text-sm my-1"
                                  @click.prevent="submitOrder(t, $emit)">
                                  {{ t.name }}
                                </button>

                                <!-- Add Icon to this -->
                                <button
                                  class="flex bg-inherit border border-gray-500 py-4 w-44 justify-center text-sm my-1"
                                  @click="togglePayment">
                                  Split Payment
                                </button>
                              </div>
                              <div class="flex flex-col items-start h-full w-full mt-3 leading-9">
                                <h1 class="mb-3 text-xl font-light antialiased hover:subpixel-antialiased">
                                  Payment
                                </h1>

                                <div v-if="isDiscount" class="flex justify-between w-full">
                                  Subtotal:
                                  <div>
                                    <span class="text-2xl ml-auto" :class="[
                                      isDiscount
                                        ? 'line-through text-red-600'
                                        : 'text-sky-500 font-semibold',
                                    ]">{{
    priceFormat(
      store.useActiveOrder.totalFirstDraft
    )
}}
                                    </span>
                                  </div>
                                </div>
                                <div v-if="isDiscount" class="flex justify-between w-full">
                                  Tax (VAT):
                                  <div>
                                    <span class="font-semibold text-2xl text-orange-500 ml-auto">{{
                                        priceFormat(
                                          store.useActiveOrder.totalTax
                                        )
                                    }}</span>
                                  </div>
                                </div>
                                <div class="flex justify-between w-full">
                                  Total:
                                  <div>
                                    <span class="font-semibold text-2xl text-sky-500 ml-auto">
                                      {{
                                          priceFormat(
                                            store.useActiveOrder.totalPrice
                                          )
                                      }}</span>
                                  </div>
                                </div>

                                <div class="relative flex justify-start w-full">
                                  Cash:
                                  <!-- v-model="store.cash"  -->
                                  <input ref="input" type="text" :value="cashScreen"
                                    class="grow font-semibold text-3xl bg-inherit text-end focus:ring-0 border-0 border-b border-gray-500 focus:border-sky-500" />
                                  <span class="absolute left-12 top-2 text-xl">
                                    <i class="fa fa-pencil"></i>
                                  </span>
                                </div>
                                <div class="flex justify-between w-full text-red-600">
                                  Change:
                                  <span class="font-semibold text-2xl text-sky-500 ml-auto">{{ priceFormat(store.change)
                                  }}
                                  </span>
                                </div>
                                <div class="flex justify-around w-full h-full bottom-0">
                                  <moneys></moneys>

                                  <NumPad v-model="inputMoney" @close="calculateCash"
                                    @update:calc-memory="updateInputMoney"></NumPad>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import {
  ref,
  watch,
  watchEffect,
  computed,
  defineEmits,
  defineProps,
  onMounted,
  inject,
  defineAsyncComponent,
} from "vue";
import { useRouter } from "vue-router";
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue";
import { useOrderStore } from "@/Orders/ordersStore";
import { useOrderItem } from "@/Orders/orderComposables/orderItemProperties";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import Modal from "@/components/shared/Modal.vue";
import Calculator from "@/components/shared/calculator/Calculator.vue";
import NumPad from "@/components/shared/calculator/NumPad.vue";

import Moneys from "@/Orders/components/Cards/Moneys.vue";
import PaymentPopperDiscount from "@/Orders/components/Modals/PaymentPopperDiscount.vue";

import { useOrder } from "@/Orders/orderComposables/orderProperties";

defineEmits(["close", "cashOut"]);
defineProps({
  open: { type: Boolean, default: false },
});
const togglePayment = inject("togglePayment");
const toggleAlert = inject("toggleAlert");
const isShowItems = ref(true);
const store = useOrderStore();
const router = useRouter();
onMounted(store.loadPaymentTypes);
console.log("paymentTypes", store.usePaymentTypes);

const priceFormat = store.priceFormat;
watchEffect(() => store.updateChange());
const selectedOrderItem = ref(null);
watch(selectedOrderItem, () => store.setActiveItem(selectedOrderItem.value));

// NEW CALCULATIONS
const inputMoney = ref(0);
const updateInputMoney = (memory) => (inputMoney.value = memory.value);

const calculateCash = async () => {
  console.log(store.cash, inputMoney.value)
  await store.addCash(+inputMoney.value);
  await store.updateChange()
  inputMoney.value = 0
}

const cashScreen = computed(() => {
  if (!store.cash && !inputMoney.value) {
    return "0"
  } else if (!inputMoney.value) {
    return store.cash
  } else if (!store.cash) {
    return inputMoney.value
  }
  return `${store.cash} + ${inputMoney.value} = ${store.cash + +inputMoney.value}`

})


const isDiscount = computed(() => store.useActiveOrder.discount);

const openDiscountPopper = () => {
  store.openOrderDiscountModal = true;
};
const closeDiscountPopper = () => {
  ID.value = null;
};

const cashValue = ref(0);

const addCashValue = (value) => {
  cashValue.value = value;
  store.addCash(value);
};

const showItems = () => (isShowItems.value = !isShowItems.value);

const ID = ref(null);
const cartItem = ref(null);

const orderDiscountModal = () => {
  store.openOrderDiscountModal = false;
};

const selectItem = (item) => {
  if (!ID.value) {
    ID.value = item.id;
  } else if (ID.value !== item.id) {
    ID.value = item.id;
  } else {
    ID.value = null;
  }
};

const submitOrder = async (pType, emit) => {
  togglePayment()
  try {
    const newOrder = await store.submitOrder(pType);
    toggleAlert("success", { header: "Order saved!", body: "You order has been saved successfully!" })
    await router.push(`/store/order/${newOrder.number}`);

  } catch (error) {

    toggleAlert("failed", { header: "Order not saved!", body: "You order was failed!" })
  }

};
</script>
