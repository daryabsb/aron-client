<script setup>
import { ref, onMounted } from "vue";
import taxesAPI from "@/services/taxesAPI"
import ToggleCheck from "@/components/shared/forms/ToggleCheck.vue";
import ShortToggle from "@/components/shared/forms/ShortToggle.vue";
import FormItem from "@/components/shared/forms/FormItem.vue";
import FormLabel from "@/components/shared/forms/FormLabel.vue";
import FormInput from "@/components/shared/forms/FormInput.vue";
import FormSelect from "@/components/shared/forms/FormSelect.vue";
import FormNumbers from "@/components/shared/forms/FormNumbers.vue";

const displayWithTax = ref(false);
const allowNegativePrice = ref(false);
const costPriceBasedMarkup = ref(false)
const updatePriceOnPurchase = ref(false)
const movingAveragePrice = ref(false)
const taxes = ref([])
onMounted(async () => {
    const taxesResponse = await taxesAPI.getAll()

    console.log(taxesResponse.data);
    taxes.value = await taxesResponse.data.map(t => t.name)
})

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
                    <h1 class="text-2xl font-light shadow-none drop-shadow-sm text-zinc-300">
                        Products settings
                    </h1>
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <FormLabel>Display and print items with tax</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="displayWithTax" @click="displayWithTax = !displayWithTax" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Discount apply rule</FormLabel>
                        <FormInput>
                            <FormSelect :list="['Before tax', 'After tax']" selected="Before tax" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Sorting</FormLabel>
                        <FormInput>
                            <FormSelect :list="['Name', 'Code']" selected="Name" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Allow negative price</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="allowNegativePrice"
                                @click="allowNegativePrice = !allowNegativePrice" />
                        </FormInput>
                    </FormItem>


                </div>
            </div>
            <div class="space-y-2">
                <div>
                    <h1 class="text-2xl font-light shadow-none drop-shadow-sm text-zinc-300">
                        Product defaults
                    </h1>
                </div>
                <div class="space-y-2">
                    <FormItem v-if="(taxes)">
                        <FormLabel>Default tax rate</FormLabel>
                        <FormInput>
                            <FormSelect :list="taxes" :selected="taxes[0]" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Cost price based markup</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="costPriceBasedMarkup"
                                @click="costPriceBasedMarkup = !costPriceBasedMarkup" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Automatically update price on purchase</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="updatePriceOnPurchase"
                                @click="updatePriceOnPurchase = !updatePriceOnPurchase" />
                        </FormInput>
                    </FormItem>
                </div>
            </div>
            <div class="space-y-2">
                <div>
                    <h1 class="text-2xl font-light shadow-none drop-shadow-sm text-zinc-300">
                        Moving average price
                    </h1>
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <FormLabel>Enable moving average price</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="movingAveragePrice"
                                @click="movingAveragePrice = !movingAveragePrice" />
                        </FormInput>
                    </FormItem>
                </div>
            </div>
        </div>
    </form>
</template>