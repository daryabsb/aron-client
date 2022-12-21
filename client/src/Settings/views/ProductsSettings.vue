<script setup>
import { ref } from "vue";
import ToggleCheck from "@/components/shared/forms/ToggleCheck.vue";
import ShortToggle from "@/components/shared/forms/ShortToggle.vue";
import FormItem from "@/components/shared/forms/FormItem.vue";
import FormLabel from "@/components/shared/forms/FormLabel.vue";
import FormInput from "@/components/shared/forms/FormInput.vue";
import FormSelect from "@/components/shared/forms/FormSelect.vue";
import FormNumbers from "@/components/shared/forms/FormNumbers.vue";

const displayWithTax = ref(false);


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
                </div>
            </div>
        </div>
    </form>
</template>