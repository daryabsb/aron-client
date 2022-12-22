<script setup>
import { ref } from "vue";
import ToggleCheck from "@/components/shared/forms/ToggleCheck.vue";
import ShortToggle from "@/components/shared/forms/ShortToggle.vue";
import FormItem from "@/components/shared/forms/FormItem.vue";
import FormLabel from "@/components/shared/forms/FormLabel.vue";
import FormInput from "@/components/shared/forms/FormInput.vue";
import FormSelect from "@/components/shared/forms/FormSelect.vue";
import FormNumbers from "@/components/shared/forms/FormNumbers.vue";

const useFloorPlans = ref(false);
const useSounds = ref(false);
const showSoundOptions = ref(false);
const navigationSound = ref(false);
const itemAddedSound = ref(false);
const itemNotFoundSound = ref(false);
const showSearchOptions = ref(true);
const separateRowForEachItem = ref(true);
const preventNegativeInventory = ref(false);
const singleUser = ref(false);
const openReceiptDialog = ref(true)
const dueDate = ref(0)
const mergeItemsOnReceipt = ref(false)
const singleItemDiscount = ref(true)
const confirmShortcutKeysPayment = ref(true)
const enableOrderName = ref(true)
const orderNameRequired = ref(false)
const requestOrderName = ref(true)
const showAdvanceSettings = ref(false)

const changeDueDate = (amount) => {
    if (amount === -1 && dueDate.value === 0) return
    amount === -1 ? dueDate.value-- : dueDate.value++
}



</script>
<template>
    <form class="space-y-2 divide-y divide-gray-500 overflow-auto">
        <div class="space-y-2 sm:space-y-2">
            <div class="space-y-2">
                <div>
                    <h1 class="text-2xl font-light drop-shadow-sm text-zinc-300">
                        Basic operations
                    </h1>
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <FormLabel>Use floor plans</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="useFloorPlans" @click="useFloorPlans = !useFloorPlans" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Sounds</FormLabel>
                        <div class="flex justify-start">
                            <FormInput>
                                <ShortToggle :enabled="useSounds" @click="useSounds = !useSounds" />
                            </FormInput>
                            <p class="ml-3 text-blue-400 hover:text-blue-300 cursor-pointer text-sm font-light"
                                @click="showSoundOptions = !showSoundOptions">
                                Show sound options
                            </p>
                        </div>
                    </FormItem>
                    <div v-if="showSoundOptions" :class="[
                        useSounds ? 'opacity-100 text-white' : 'opacity-60 text-zinc-500',
                        'ml-3 border-l border-zinc-500',
                    ]">
                        <FormItem>
                            <FormLabel>Navigation </FormLabel>
                            <FormInput>
                                <ShortToggle :disabled="!useSounds" :enabled="navigationSound"
                                    @click="navigationSound = !navigationSound" />
                            </FormInput>
                        </FormItem>
                        <FormItem>
                            <FormLabel>Item added</FormLabel>
                            <FormInput>
                                <ShortToggle :disabled="!useSounds" :enabled="itemAddedSound"
                                    @click="itemAddedSound = !itemAddedSound" />
                            </FormInput>
                        </FormItem>
                        <FormItem>
                            <FormLabel>Item not found</FormLabel>
                            <FormInput>
                                <ShortToggle :disabled="!useSounds" :enabled="itemNotFoundSound"
                                    @click="itemNotFoundSound = !itemNotFoundSound" />
                            </FormInput>
                        </FormItem>
                    </div>
                </div>
            </div>
            <div class="space-y-2">
                <div>
                    <h1 class="text-2xl font-light text-zinc-300">Items</h1>
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <FormLabel>Default search</FormLabel>
                        <FormInput>
                            <FormSelect :list="['Barcode', 'Number', 'Name']" selected="Barcode" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Show search options</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="showSearchOptions" @click="showSearchOptions = !showSearchOptions" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Default discount type</FormLabel>
                        <FormInput>
                            <FormSelect :list="['Percentage', 'Fixed']" selected="Percentage" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Separate row for each item</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="separateRowForEachItem"
                                @click="separateRowForEachItem = !separateRowForEachItem" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Prevent negative inventory</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="preventNegativeInventory"
                                @click="preventNegativeInventory = !preventNegativeInventory" />
                        </FormInput>
                    </FormItem>
                </div>
            </div>
            <div class="space-y-2">
                <div>
                    <h1 class="text-2xl font-light text-zinc-300">Users</h1>
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <FormLabel>Single user</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="singleUser" @click="singleUser = !singleUser" />
                        </FormInput>
                    </FormItem>
                </div>
            </div>
            <div class="space-y-4">
                <div>
                    <h1 class="text-2xl font-thin text-zinc-300">Payment</h1>
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <FormLabel>Display receipt dialog</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="openReceiptDialog" @click="openReceiptDialog = !openReceiptDialog" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Default due date</FormLabel>
                        <FormInput>
                            <div class="flex flex-nowrap">
                                <FormNumbers :number="dueDate" @change="changeDueDate" />
                            </div>
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Merge items on receipt</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="mergeItemsOnReceipt"
                                @click="mergeItemsOnReceipt = !mergeItemsOnReceipt" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Single item discount allowed</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="singleItemDiscount"
                                @click="singleItemDiscount = !singleItemDiscount" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Shortcut keys payment confirmation</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="confirmShortcutKeysPayment"
                                @click="confirmShortcutKeysPayment = !confirmShortcutKeysPayment" />
                        </FormInput>
                    </FormItem>
                </div>
            </div>
            <div class="space-y-2">
                <div>
                    <h1 class="text-2xl font-light text-zinc-300">Order name</h1>
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <FormLabel>Enable custom order name</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="enableOrderName" @click="enableOrderName = !enableOrderName" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Order name required</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="orderNameRequired" @click="orderNameRequired = !orderNameRequired" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Request order name automatically</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="requestOrderName" @click="requestOrderName = !requestOrderName" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <p class="ml-3 text-blue-400 hover:text-blue-300 cursor-pointer text-sm font-light"
                            @click="showAdvanceSettings = !showAdvanceSettings">
                            Show advanced settings
                        </p>
                    </FormItem>
                </div>
            </div>
        </div>
    </form>
    <!-- const openReceiptDialog = ref(false)
const dueDate = ref(1)
const MergeItemsOnReceipt = ref(false)
const singleItemDiscount = ref(false)
const confirmShortcutKeysPayment = ref(false)
const enableOrderName = ref(false)
const orderNameRequired = ref(false)
const requestOrderName = ref(false) -->
</template>