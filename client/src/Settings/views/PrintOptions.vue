<script setup>
import { ref } from 'vue';
import FormItem from "@/components/shared/forms/FormItem.vue";
import FormLabel from "@/components/shared/forms/FormLabel.vue";
import FormInput from "@/components/shared/forms/FormInput.vue";
import FormText from '@/components/shared/forms/FormText.vue';
import ShortToggle from '@/components/shared/forms/ShortToggle.vue';
import FormNumbers from "@/components/shared/forms/FormNumbers.vue";
import InformationAlert from '@/components/shared/InformationAlert.vue';


const printReceipt = ref(false);

</script>

<template>
    <form class="space-y-2 divide-y divide-gray-500 overflow-auto">
        <div class="space-y-2 sm:space-y-2">
            <div class="space-y-2">
                <div>
                    <h1 class="text-2xl font-light shadow-none drop-shadow-sm text-zinc-300">
                        Print options
                    </h1>
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <div class="flex space-x-2 col-span-4 items-center">
                            <ShortToggle :enabled="printReceipt" @click="printReceipt = !printReceipt" />
                            <FormLabel>Print receipt</FormLabel>
                        </div>
                    </FormItem>
                </div>
            </div>
        </div>
    </form>
</template>