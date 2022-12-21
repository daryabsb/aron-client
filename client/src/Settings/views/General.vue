<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...border-gray-500
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<script setup>
import { ref } from 'vue';
import ToggleCheck from "@/components/shared/forms/ToggleCheck.vue"
import ShortToggle from '@/components/shared/forms/ShortToggle.vue';
import FormItem from '@/components/shared/forms/FormItem.vue';
import FormLabel from '@/components/shared/forms/FormLabel.vue';
import FormInput from '@/components/shared/forms/FormInput.vue';
import FormSelect from '@/components/shared/forms/FormSelect.vue';
import FormNumbers from '@/components/shared/forms/FormNumbers.vue';


const languages = [
    "English", "Kurdish", "Arabic"
]
const writingDirections = [
    "Ltr", "Rtl"
]
const layouts = [
    "Visual", "Standard"
]
const zooms = [
    50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150
]
const buttonBars = [
    {
        name: "Search",
        enabled: true,
        isVisual: true,
    },
    {
        name: "Transfer",
        enabled: true,
        isVisual: true,
    },
    {
        name: "Discount",
        enabled: true,
        isVisual: true,
    },
    {
        name: "Comment",
        enabled: true,
        isVisual: true,
    },
    {
        name: "New sale",
        enabled: true,
        isVisual: true,
    },
    {
        name: "Refund",
        enabled: true,
        isVisual: true,
    },
    {
        name: "Order name",
        enabled: true,
        isVisual: false,
    },
    {
        name: "Cash drawer",
        enabled: false,
        isVisual: false,
    },
]

const enVirtKeyboard = ref(false)
const showCloseAlert = ref(false)
const closeAlert = ref(true)
const slideIn = ref(true)
const ahowCashOnStart = ref(false)
const selectBusinessDayOnStart = ref(false)
const rows = ref(0)
const cols = ref(0)
const alertDuration = ref(3)
const changeAlertDuration = (amount) => {
    if (amount === -1 && alertDuration.value === 0) return
    amount === -1 ? alertDuration.value-- : alertDuration.value++
}
const changeCol = (amount) => {
    if (amount === -1 && cols.value === 0) return
    amount === -1 ? cols.value-- : cols.value++
}
const changeRow = (amount) => {
    if (amount === -1 && rows.value === 0) return
    amount === -1 ? rows.value-- : rows.value++
}
</script>
<template>
    <form class="space-y-4 divide-y divide-gray-500 overflow-auto">
        <div class="space-y-4  sm:space-y-2">
            <div class="space-y-2">
                <div>
                    <h1 class="text-2xl font-light text-zinc-300">Application styles</h1>
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormInput>
                            <FormSelect :list="languages" selected="Kurdish" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Writing direction</FormLabel>
                        <FormSelect :list="writingDirections" selected="Ltr" />
                    </FormItem>
                    <FormItem>
                        <FormLabel>Color scheme</FormLabel>
                        <FormSelect :list="layouts" selected="Visual" />
                    </FormItem>

                    <FormItem>
                        <FormLabel>Number of rows/columns</FormLabel>
                        <FormInput>
                            <div class="flex flex-nowrap">
                                <FormNumbers :number="rows" @change="changeRow" />
                                <span class="text-white text-xl mx-2">/</span>
                                <FormNumbers :number="cols" @change="changeCol" />
                            </div>
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Enable virtual keyboard</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="enVirtKeyboard" @click="(enVirtKeyboard = !enVirtKeyboard)" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Writing direction</FormLabel>
                        <FormSelect :list="zooms" :selected="100" />
                    </FormItem>
                </div>
            </div>
            <div class="space-y-2 text-white pt-2 sm:space-y-1 sm:pt-2">
                <div>
                    <h1 class="text-2xl  font-light text-zinc-300">Messages</h1>
                </div>
                <div class="space-y-2 ">
                    <FormItem>
                        <FormLabel>Show close button</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="showCloseAlert" @click="(showCloseAlert = !showCloseAlert)" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Close on click</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="closeAlert" @click="(closeAlert = !closeAlert)" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Slide in</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="slideIn" @click="(slideIn = !slideIn)" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Message duration (seconds)</FormLabel>
                        <FormInput>
                            <FormNumbers :number="alertDuration" @change="changeAlertDuration" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormSelect :list="['Top', 'Bottom', 'Center']" selected="Top" />
                    </FormItem>
                </div>
            </div>
            <div class="space-y-4 text-white pt-1 sm:space-y-1 sm:pt-2">
                <div>
                    <h1 class="text-2xl  font-light text-zinc-300">Business day</h1>
                </div>
                <div class="space-y-2 ">
                    <FormItem>
                        <FormLabel>Show cash in on application start</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="ahowCashOnStart" @click="(ahowCashOnStart = !ahowCashOnStart)" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Select business day on application start</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="selectBusinessDayOnStart"
                                @click="(selectBusinessDayOnStart = !selectBusinessDayOnStart)" />
                        </FormInput>
                    </FormItem>
                </div>
            </div>
            <div class="space-y-4 text-white pt-1 sm:space-y-1">
                <div>
                    <h1 class="text-2xl font-light text-zinc-300">Button bar</h1>
                    <p class="my-1  text-sm ">Select action to appear on button bar.</p>
                </div>
                <FormItem>
                    <div class="col-span-4">
                        <div class="grid grid-cols-4 justify-center items-center">
                            <div v-for="btn in buttonBars" :key="btn" class="col-span-1">

                                <FormLabel>
                                    <span>
                                        <input type="checkbox" v-model="btn.enabled">
                                    </span>
                                    {{ btn.name }}
                                </FormLabel>
                            </div>

                        </div>
                        <span class="mt-1 text-xs italic text-zinc-300">* Applicable for "Visual" layout only</span>
                    </div>
                </FormItem>
            </div>
        </div>

    </form>
</template>