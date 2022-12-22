<!-- POS USB/Serial Port VFD Pole Customer Display -->
<script setup>
import { ref } from "vue";
import ShortToggle from "@/components/shared/forms/ShortToggle.vue";
import FormItem from "@/components/shared/forms/FormItem.vue";
import FormLabel from "@/components/shared/forms/FormLabel.vue";
import FormInput from "@/components/shared/forms/FormInput.vue";
import FormSelect from "@/components/shared/forms/FormSelect.vue";
import FormNumbers from "@/components/shared/forms/FormNumbers.vue";
import FormText from "@/components/shared/forms/FormText.vue";

const enableCustomerDisplay = ref(false);
const showComPortOptions = ref(false)
const bitsSeconds = ref(0)
const bitsPerSecond = ref([
    110, 300, 600, 1200,
    2400, 4800, 9600, 14400,
    19200, 38400, 57600, 115200,
    128000, 256000
])
const dataBits = ref(8)
const parity = ref('')
const stopBits = ref(1.5)
const flowControl = ref('')
const numberOfCharacters = ref(20)
const welcomeFirstLine = ref('')
const welcomeSecondLine = ref('')
const changeNumberOfCharacters = (amount) => {
    if (amount < 0 && numberOfCharacters.value === 20) return
    amount === -1 ? numberOfCharacters.value-- : numberOfCharacters.value++
}


</script>
<template>
    <form class="space-y-2 divide-y divide-gray-500 overflow-auto">
        <div class="space-y-2 sm:space-y-2">
            <div class="space-y-2">
                <div>
                    <h1 class="text-2xl font-light drop-shadow-sm text-zinc-300">
                        Customer display screen
                    </h1>
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <FormLabel>Enabled</FormLabel>
                        <FormInput>
                            <ShortToggle :enabled="enableCustomerDisplay"
                                @click="enableCustomerDisplay = !enableCustomerDisplay" />
                        </FormInput>
                    </FormItem>

                    <FormItem>
                        <FormLabel>COM Port</FormLabel>
                        <div class="flex justify-start items-center col-span-4">
                            <FormInput>
                                <FormSelect :list="['COM1', 'USB', 'BLUETOOTH', 'SECOND DISPLAY']" selected="COM1" />
                            </FormInput>
                            <p class="ml-3 text-blue-400 hover:text-blue-300 cursor-pointer text-sm font-light"
                                @click="showComPortOptions = !showComPortOptions">
                                Show communications port options
                            </p>
                        </div>

                    </FormItem>

                    <div v-if="showComPortOptions" :class="[
                        enableCustomerDisplay ? 'opacity-100 text-white' : 'opacity-60 text-zinc-500',
                        'ml-4 border-l border-zinc-500',
                    ]">
                        <FormItem>
                            <FormLabel>Bits per second </FormLabel>
                            <FormInput>
                                <FormSelect v-model="bitsPerSecond" :list="bitsPerSecond" :selected="14400" />
                            </FormInput>
                        </FormItem>
                        <FormItem>
                            <FormLabel>Data bits</FormLabel>
                            <FormInput>
                                <FormSelect v-model="dataBits" :list="[5, 6, 7, 8]" :selected="8" />
                            </FormInput>
                        </FormItem>
                        <FormItem>
                            <FormLabel>Parity</FormLabel>
                            <FormInput>
                                <FormSelect v-model="parity" :list="['None', 'Odd', 'Even', 'Mark', 'Space']"
                                    selected="None" />
                            </FormInput>
                        </FormItem>
                        <FormItem>
                            <FormLabel>Stop bits</FormLabel>
                            <FormInput>
                                <FormSelect v-model="stopBits" :list="[1, 1.5, 2]" :selected="1.5" />
                            </FormInput>
                        </FormItem>
                        <FormItem>
                            <FormLabel>Flow control</FormLabel>
                            <FormInput>
                                <FormSelect v-model="flowControl"
                                    :list="['None', 'Xon/Xoff', 'Hardware', 'Hardware & Xonn/Xoff']" selected="None" />
                            </FormInput>
                        </FormItem>
                        <FormItem>
                            <FormLabel class="text-blue-400 text-sm cursor-pointer">Restore defaults</FormLabel>

                        </FormItem>
                    </div>
                    <FormItem>
                        <FormLabel>Number of characters </FormLabel>
                        <FormInput>
                            <FormNumbers :number="numberOfCharacters" @change="changeNumberOfCharacters" />
                        </FormInput>
                    </FormItem>
                </div>
            </div>
            <div class="space-y-2">
                <div>
                    <h1 class="text-2xl font-light drop-shadow-sm text-zinc-300">
                        Welcome message
                    </h1>
                </div>
                <div class="space-y-2">
                    <FormItem>
                        <FormLabel>First line</FormLabel>
                        <FormInput>
                            <FormText :text="welcomeFirstLine" />
                        </FormInput>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Second line</FormLabel>
                        <FormInput>
                            <FormText :text="welcomeSecondLine" />
                        </FormInput>
                    </FormItem>
                    <button class="py-3 w-32 text-white hover:bg-zinc-700 bg-transparent border border-zinc-500">Test
                        message</button>
                </div>
            </div>
        </div>
    </form>
</template>