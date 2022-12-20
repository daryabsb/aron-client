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
import { Switch } from '@headlessui/vue'
import ToggleCheck from "@/components/shared/forms/ToggleCheck.vue"
import ShortToggle from '@/components/shared/forms/ShortToggle.vue';

const enVirtKeyboard = ref(false)
const showCloseAlert = ref(false)
const closeAlert = ref(true)
const slideIn = ref(true)
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
    <form class="space-y-8 divide-y divide-gray-500 overflow-auto">
        <div class="space-y-8 divide-y divide-gray-500 sm:space-y-5">

            <div class="space-y-6 sm:space-y-5 ">
                <div>
                    <h3 class="text-lg font-medium leading-6 text-white">Application settings</h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-300">Basically this section is about the look of your
                        application regarding colors,
                        language etc.
                    </p>
                </div>
                <div class="space-y-3 sm:space-y-2">
                    <div class="sm:grid sm:grid-cols-3 text-gray-200 sm:items-start sm:gap-4  sm:pt-1">
                        <label for="first-name"
                            class="block text-sm font-medium text-white sm:mt-px sm:pt-2">Language</label>
                        <div class="mt-1 sm:col-span-2 sm:mt-0">
                            <select id="country" name="country" autocomplete="country-name"
                                class="block w-full max-w-lg text-white border-0 border-b border-gray-500 focus:outline-none sm:max-w-xs sm:text-sm bg-transparent">
                                <option class="bg-gray-500">English</option>
                                <option class="bg-gray-500" selected>Kurdish</option>
                                <option class="bg-gray-500">Arabic</option>
                            </select>
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4  sm:pt-1">
                        <label for="last-name" class="block text-sm font-medium text-white sm:mt-px sm:pt-2">Writing
                            direction</label>
                        <div class="mt-1 sm:col-span-2 sm:mt-0">
                            <select id="country" name="country" autocomplete="country-name"
                                class="block w-full max-w-lg text-white border-0 border-b border-gray-500 focus:outline-none sm:max-w-xs sm:text-sm bg-transparent">
                                <option class="bg-gray-500" selected>Ltr</option>
                                <option class="bg-gray-500">Rtl</option>
                            </select>
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-1">
                        <label for="email" class="block text-sm font-medium text-white sm:mt-px sm:pt-2">Color
                            scheme</label>
                        <div class="mt-1 sm:col-span-2 sm:mt-0">
                            <select id="country" name="country" autocomplete="country-name"
                                class="block w-full max-w-lg text-white border-0 border-b border-gray-500 focus:outline-none sm:max-w-xs sm:text-sm bg-transparent">
                                <option v-for="color in ['Dark', 'Light', 'Blue', 'Pink', 'System']" :key="color"
                                    :value="color" class="bg-gray-500">{{ color }}</option>

                            </select>
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-1">
                        <label for="country"
                            class="block text-sm font-medium text-white sm:mt-px sm:pt-2">Layout</label>
                        <div class="mt-1 sm:col-span-2 sm:mt-0">
                            <select id="country" name="country" autocomplete="country-name"
                                class="block w-full max-w-lg border-0 border-b text-white border-gray-500 focus:outline-none sm:max-w-xs sm:text-sm bg-transparent">
                                <option class="bg-gray-500">Standard</option>
                                <option class="bg-gray-500" selected>Visual</option>
                            </select>
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-1">
                        <label for="street-address" class="block text-sm font-medium text-white sm:mt-px sm:pt-2">Number
                            of rows/columns</label>
                        <div class="mt-1 sm:col-span-2 sm:mt-0 flex justify-start items-center">
                            <div class="flex flex-row  w-24 h-6 relative border border-zinc-500 bg-transparent mt-1">
                                <button
                                    class="flex items-center bg-transparent border-r border-zinc-500 text-white hover:text-zinc-500 h-full w-full rounded-l cursor-pointer "
                                    @click.prevent="changeRow(-1)">
                                    <span class="mb-1 mx-auto text-2xl font-thin">−</span>
                                </button>
                                <input v-model="rows" type="number"
                                    class=" focus:outline-none text-center w-8 border-0 bg-transparent font-semibold text-md flex items-center text-white"
                                    name="custom-input-number" />
                                <button
                                    class="flex items-center bg-transparent text-white hover:text-zinc-500  h-full w-full rounded-r border-l border-zinc-500 cursor-pointer"
                                    @click.prevent="changeRow(1)">
                                    <span class="mb-1 mx-auto text-2xl font-thin">+</span>
                                </button>
                            </div>
                            <span class="text-white text-2xl mx-2">/</span>
                            <div class="flex flex-row  w-24 h-6 relative border border-zinc-500 bg-transparent mt-1">
                                <button
                                    class="flex items-center  bg-transparent border-r border-zinc-500 text-white hover:text-zinc-500  h-full w-full rounded-l cursor-pointer "
                                    @click.prevent="changeCol(-1)">
                                    <span class="mb-1 mx-auto text-2xl font-thin">−</span>
                                </button>
                                <input v-model="cols" type="number"
                                    class=" focus:outline-none text-center w-8 border-0 bg-transparent font-semibold text-md flex items-center text-white"
                                    name="custom-input-number" />
                                <button
                                    class="flex items-center bg-transparent text-white hover:text-zinc-500  h-full w-full rounded-r border-l border-zinc-500 cursor-pointer"
                                    @click.prevent="changeCol(1)">
                                    <span class="mb-1 mx-auto text-2xl font-thin">+</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-1">
                        <label for="city" class="block text-sm font-medium text-white sm:mt-px sm:pt-2">Enable virtual
                            keyboard</label>
                        <div class="mt-1 sm:col-span-2 sm:mt-0">
                            <div class="flex-shrink-0">
                                <Switch v-model="enVirtKeyboard"
                                    :class="[enVirtKeyboard ? 'bg-green-600' : 'bg-gray-500', 'relative inline-flex h-5 w-11 flex-shrink-0 cursor-pointer rounded-sm border-1 border-transparent transition-colors duration-200 ease-in-out ']">
                                    <span class="sr-only">Agree to policies</span>
                                    <span aria-hidden="true"
                                        :class="[enVirtKeyboard ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 transform rounded-sm bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                                </Switch>
                            </div>
                        </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-1">
                        <label for="region" class="block text-sm font-medium text-white sm:mt-px sm:pt-2">Zoom</label>
                        <div class="mt-1 sm:col-span-2 sm:mt-0">
                            <select id="country" name="country" autocomplete="country-name"
                                class="block w-full max-w-lg text-white border-0 border-b border-gray-500 focus:outline-none sm:max-w-xs sm:text-sm bg-transparent">
                                <option v-for="zoom in [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]" :key="zoom"
                                    :value="zoom" :selected="zoom === 100" class="bg-gray-500">{{ zoom }}</option>

                            </select>
                        </div>
                    </div>


                </div>
            </div>

            <div class="space-y-3 text-white pt-8 sm:space-y-5 sm:pt-10">
                <div>
                    <h3 class="text-lg font-medium leading-6 ">Messages</h3>
                    <p class="mt-1 max-w-2xl text-sm text-zink-300">This section is about the alerts for events for
                        success or failed operations.</p>
                </div>
                <div class="space-y-2 ">
                    <div class="pt-3 sm:pt-2">
                        <div class="sm:grid sm:grid-cols-3 sm:items-center  sm:gap-4">
                            <div class="text-base font-medium text-gray-900 sm:text-sm sm:text-white" id="label-email">
                                Show close button</div>
                            <div class="mt-4 sm:col-span-2 sm:mt-0">
                                <div class="max-w-lg space-y-4">
                                    <div class="relative flex items-start">
                                        <div class="flex h-5 items-center">
                                            <ShortToggle :enabled="showCloseAlert"
                                                @click="(showCloseAlert = !showCloseAlert)" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pt-3 sm:pt-2">
                        <div role="group">
                            <div class="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
                                <div>
                                    <div class="text-base font-medium text-gray-900 sm:text-sm sm:text-white"
                                        id="label-email">Close on click</div>
                                </div>
                                <div class="mt-4 sm:col-span-2 sm:mt-0">
                                    <div class="max-w-lg space-y-2">
                                        <div class="relative flex items-start">
                                            <div class="flex h-5 items-center">
                                                <ShortToggle :enabled="closeAlert"
                                                    @click="(closeAlert = !closeAlert)" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pt-3 sm:pt-2">
                        <div class="sm:grid sm:grid-cols-3 sm:items-center  sm:gap-4">
                            <div class="text-base font-medium text-gray-900 sm:text-sm sm:text-white" id="label-email">
                                Slide in</div>
                            <div class="mt-4 sm:col-span-2 sm:mt-0">
                                <div class="max-w-lg space-y-4">
                                    <div class="relative flex items-start">
                                        <div class="flex h-5 items-center">
                                            <ShortToggle :enabled="slideIn" @click="(slideIn = !slideIn)" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pt-3 sm:pt-2">
                        <div role="group">
                            <div class="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
                                <div>
                                    <div class="text-base font-medium text-gray-900 sm:text-sm sm:text-white"
                                        id="label-email">Message duration (seconds)</div>
                                </div>
                                <div
                                    class="flex flex-row  w-24 h-6 relative border border-zinc-500 bg-transparent mt-1">
                                    <button
                                        class="flex items-center  bg-transparent border-r border-zinc-500 text-white hover:text-zinc-500  h-full w-full rounded-l cursor-pointer "
                                        @click.prevent="changeAlertDuration(-1)">
                                        <span class="mb-1 mx-auto text-2xl font-thin">−</span>
                                    </button>
                                    <input v-model="alertDuration" type="number"
                                        class=" focus:outline-none text-center w-8 border-0 bg-transparent font-semibold text-md flex items-center text-white"
                                        name="custom-input-number" />
                                    <button
                                        class="flex items-center bg-transparent text-white hover:text-zinc-500  h-full w-full rounded-r border-l border-zinc-500 cursor-pointer"
                                        @click.prevent="changeAlertDuration(1)">
                                        <span class="mb-1 mx-auto text-2xl font-thin">+</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-1">
                        <label for="region"
                            class="block text-sm font-medium text-white sm:mt-px sm:pt-2">Position</label>
                        <div class="mt-1 sm:col-span-2 sm:mt-0">
                            <select id="country" name="country" autocomplete="country-name"
                                class="block w-full max-w-lg text-white border-0 border-b border-gray-500 focus:outline-none sm:max-w-xs sm:text-sm bg-transparent">
                                <option v-for="position in ['Top', 'Bottom', 'Center']" :key="position"
                                    :value="position" :selected="position === 'Top'" class="bg-gray-500">{{ position }}
                                </option>

                            </select>
                        </div>
                    </div>
                    <div class="pt-6 sm:pt-5">
                        <div role="group" aria-labelledby="label-notifications">
                            <div class="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                                <div>
                                    <div class="text-base font-medium text-gray-900 sm:text-sm sm:text-white"
                                        id="label-notifications">Push Notifications</div>
                                </div>
                                <div class="sm:col-span-2">
                                    <div class="max-w-lg">
                                        <p class="text-sm text-gray-500">These are delivered via SMS to your mobile
                                            phone.</p>
                                        <div class="mt-4 space-y-4">
                                            <div class="flex items-center">
                                                <input id="push-everything" name="push-notifications" type="radio"
                                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                <label for="push-everything"
                                                    class="ml-3 block text-sm font-medium text-white">Everything</label>
                                            </div>
                                            <div class="flex items-center">
                                                <input id="push-email" name="push-notifications" type="radio"
                                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                <label for="push-email"
                                                    class="ml-3 block text-sm font-medium text-white">Same as
                                                    email</label>
                                            </div>
                                            <div class="flex items-center">
                                                <input id="push-nothing" name="push-notifications" type="radio"
                                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                <label for="push-nothing"
                                                    class="ml-3 block text-sm font-medium text-white">No push
                                                    notifications</label>
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

        <div class="pt-5">
            <div class="flex justify-end">
                <button type="button"
                    class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
                <button type="submit"
                    class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
            </div>
        </div>
    </form>
</template>