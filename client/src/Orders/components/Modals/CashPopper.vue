<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="toggleCash">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex h-screen items-end justify-center p-2 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative h-4/5 sm:w-4/5 transform overflow-hidden rounded-sm bg-gray-800 border-2 border-red-500 text-left shadow-xl transition-all">
              <!-- <slot name="icon"></slot> -->

              <!-- <DialogTitle as="h3">
                    <slot name="title">
                      <h1 class="text-xl text-white py-4">Pay with cash</h1>
                    </slot>
                  </DialogTitle> -->

              <div class="h-full w-full flex items-center text-white border-2 border-sky-500 bg-gray-900">
                <!-- ITEMS AT PAYMENT MODAL -->
                <div class="flex w-full h-full border-2 border-green-500">
                  <div v-if="isShowItems"
                    class="inset-0 h-full text-center bg-transparent text-white border border-pink-600">
                    <!-- <div class="w-full h-full bg-gray-700 border-r border-gray-500"> -->
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
                                ]">{{ item.product.name }}</RadioGroupLabel>
                              </span>
                              <RadioGroupDescription as="span" class="pl-1 text-sm md:ml-0 md:pl-0 md:text-right">
                                <span :class="[
                                  checked ? 'text-gray-900' : 'text-white',
                                  'font-medium',
                                ]">{{ priceFormat(item.product.price) }}</span>
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
                                checked ? 'text-gray-700' : 'text-white',
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

                  <div class="text-center bg-transparent text-white border border-indigo-600"
                    :class="isShowItems ? 'w-4/5' : 'w-full'">
                    <div class="h-16 w-full flex justify-between text-left bg-gray-900 p-2 border-b border-gray-500">
                      <h1 class="text-2xl">Actions</h1>
                      <span @click="showItems">
                        X
                      </span>
                    </div>
                    <div
                      class="flex flex-col justify-around w-full h-full bg-gray-700 border-b border-r border-gray-500 text-left p-3">
                      <div class="flex justify-center text-2xl w-full text-red-500 ">
                        Change:
                        <span class="font-semibold text-green-700">{{ change }} IQD</span>
                      </div>
                      <div class="w-full py-6 text-4xl text-white font-light text-center">
                        <h1>How would the customer like the receipt?</h1>
                      </div>

                      <div class="flex flex-wrap  w-full gap-4">
                        <Button variant="transparent"
                          class="grow flex flex-col py-14 items-center justify-center w-1/4 mx-1">
                          <i class="fa fa-receipt text-2xl mb-3"></i>
                          Print receipt
                        </Button>
                        <Button variant="transparent"
                          class="grow flex flex-col py-14 items-center justify-center w-1/4 mx-1"
                          @click="printAndProceed()">
                          <i class="fa fa-print text-2xl mb-3"></i>
                          Print invoice</Button>
                        <Button variant="transparent"
                          class="grow flex flex-col py-14 items-center justify-center w-1/4 mx-1">
                          <i class="fa fa-at text-2xl mb-3"></i>
                          Send email</Button>
                        <Button variant="transparent" class="w-1/3 flex flex-col py-14 items-center justify-center">
                          <i class="fa fa-file-pdf text-2xl mb-3"></i>
                          Save as PDF
                        </Button>
                      </div>

                      <div class="flex justify-between mb-6">
                        <toggle-input label="Don't show again" target="skipPaymentModal"></toggle-input>
                        <Button variant="green" @click="toggleCash">Done</Button>
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
import { ref, toRefs, defineEmits, inject, defineAsyncComponent } from "vue";
import { useOrderStore } from "@/Orders/ordersStore";
import ToggleInput from "@/components/shared/forms/ToggleInput.vue";
import Button from "@/components/shared/Button.vue";

import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
const {
  cart,
  cash,
  change,
  addCash,
  moneys,
  clear,
  receiptNo,
  priceFormat,
  addQty,
  submitable,
  submit,
  useActiveOrder,
  totalPrice,
  subTotalBeforeDiscount,
} = toRefs(useOrderStore());

const emit = defineEmits(["close"]);
defineProps({
  open: { type: Boolean, default: false },
});

const toggleCash = inject("toggleCash");

const store = useOrderStore();

// TEMPORARY REFS NEED TO BE REVIEWED
const selectedOrderItem = ref(null);

// Numeric pad
const number = ref("");
const maxLength = ref(6);
const showKeypad = ref(true);
const onInput = (key) => {
  const myKeys = {
    10: parseInt(","),
    11: 0,
    12: parseInt("."),
  };
  key = myKeys[key] || key;
  if (key === 11) key = 0;
  // number.value = (number.value + key).slice(0, maxLength.value);
  number.value = (number.value + key).slice(0, maxLength.value);
};
const onDelete = () => {
  number.value = number.value.slice(0, number.value.length - 1);
};
const onReset = () => {
  number.value = "";
};

// const cart = useCart;
// const cash = useCash;
// const change = useChange;
const isShowItems = ref(true);
// const moneys = useMoneys;
const inputMoney = ref(0);

const cashValue = ref(0);
// const cashValue = computed(() => parseInt(number.value) + inputMoney.value);

const addCashValue = (value) => {
  cashValue.value = value;
  addCash(value);
};

const showItems = () => (isShowItems.value = !isShowItems.value);

const printAndProceed = () => {
  const receiptContent = document.getElementById("receipt-print-content");

  const titleBefore = document.title;
  const printArea = document.getElementById("print-area");

  printArea.innerHTML = receiptContent.innerHTML + printArea.innerHTML;
  document.title = receiptNo;

  window.print();
  // window.print(printArea.innerHTML);
  // isShowModalReceipt();

  printArea.innerHTML = "";
  document.title = titleBefore;

  // TODO save sale data to database

  emit("close");
  clear();
};
</script>
