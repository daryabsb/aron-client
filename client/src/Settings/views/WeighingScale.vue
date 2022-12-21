<script setup>
import { ref } from 'vue';
import FormItem from "@/components/shared/forms/FormItem.vue";
import FormLabel from "@/components/shared/forms/FormLabel.vue";
import FormInput from "@/components/shared/forms/FormInput.vue";
import FormText from '@/components/shared/forms/FormText.vue';
import ShortToggle from '@/components/shared/forms/ShortToggle.vue';
import FormNumbers from "@/components/shared/forms/FormNumbers.vue";
import InformationAlert from '@/components/shared/InformationAlert.vue';


const enableWeighingScale = ref(false);
const twoDigitsPrefix = ref("")
const itemAddedSound = ref(false);
const removeZeros = ref(false)
const printPriceInstead = ref(false)
const numberOfDigitsForProductCode = ref(0)
const numberOfDecimalPlaces = ref(0)
const changeNumberOfDigitsForProductCode = (amount) => {
    if (amount === -1 && numberOfDigitsForProductCode.value === 0) return
    amount === -1 ? numberOfDigitsForProductCode.value-- : numberOfDigitsForProductCode.value++
}
const changeNumberOfDecimalPlaces = (amount) => {
    if (amount === -1 && numberOfDecimalPlaces.value === 0) return
    amount === -1 ? numberOfDecimalPlaces.value-- : numberOfDecimalPlaces.value++
}
</script>
<template>
    <form class="space-y-2 divide-y divide-gray-500 overflow-auto">
        <div class="space-y-2 sm:space-y-2">
            <div class="space-y-2">
                <div>
                    <h1 class="text-2xl font-light shadow-none drop-shadow-sm text-zinc-300">
                        Weighing scale barcode
                    </h1>
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <div class="flex space-x-2 col-span-4 items-center">
                            <ShortToggle :enabled="enableWeighingScale"
                                @click="enableWeighingScale = !enableWeighingScale" />
                            <FormLabel>Enable weighing scale</FormLabel>
                        </div>
                    </FormItem>
                    <div v-if="enableWeighingScale" class="flex-flex-col col-span-4">
                        <FormItem>
                            <FormLabel>First two digits / prefix</FormLabel>
                            <FormInput>
                                <FormText v-model:text="twoDigitsPrefix" />
                            </FormInput>
                        </FormItem>
                        <FormItem>
                            <FormLabel>Number of digits for product code</FormLabel>
                            <FormInput>
                                <FormNumbers :number="numberOfDigitsForProductCode"
                                    @change="changeNumberOfDigitsForProductCode" />
                            </FormInput>
                        </FormItem>
                        <FormItem>
                            <FormLabel>Number of decimal places</FormLabel>
                            <FormInput>
                                <FormNumbers :number="numberOfDecimalPlaces" @change="changeNumberOfDecimalPlaces" />
                            </FormInput>
                        </FormItem>
                        <FormItem>
                            <div class="flex space-x-2 col-span-4 items-center">
                                <ShortToggle :enabled="removeZeros" @click="removeZeros = !removeZeros" />
                                <FormLabel>Remove zeros from product code (trim zeros)</FormLabel>
                            </div>
                        </FormItem>
                        <FormItem>
                            <div class="flex space-x-2 col-span-4 items-center">
                                <ShortToggle :enabled="printPriceInstead"
                                    @click="printPriceInstead = !printPriceInstead" />
                                <FormLabel>Scale prints price instead of quantity</FormLabel>
                            </div>
                        </FormItem>
                        <InformationAlert color="sky"
                            tip="Some weighing scales prints total price instead of quantity being measured. If this otion is enabled, quantity will be based on product price and total amount from the scale" />
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>