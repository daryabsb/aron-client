<template>
    <div class="overflow-hidden text-gray-300">
        <div class="">
            <h3 class="text-lg font-medium leading-6 ">Applicant general settings</h3>
            <p class="my-3  text-sm ">Basically this section is about the look of your application regarding colors,
                language etc.</p>
        </div>
        <div class="border-t border-gray-200">
            <dl>
                <div class="pt-5 py-3 sm:grid sm:grid-cols-8 sm:gap-16  text-white ">
                    <dt class="text-sm font-medium col-span-2">Language</dt>
                    <dd class="mt-1 text-sm  sm:col-span-2 sm:mt-0 col-span-4">
                        <Listbox as="div" v-model="selected">
                            <ListboxLabel class="block text-sm font-medium text-gray-700">Assigned to</ListboxLabel>
                            <div class="relative mt-1">
                                <ListboxButton
                                    class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                    <span class="block truncate">{{ selected.name }}</span>
                                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </ListboxButton>

                                <transition leave-active-class="transition ease-in duration-100"
                                    leave-from-class="opacity-100" leave-to-class="opacity-0">
                                    <ListboxOptions
                                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        <ListboxOption as="template" v-for="person in people" :key="person.id"
                                            :value="person" v-slot="{ active, selected }">
                                            <li
                                                :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-8 pr-4']">
                                                <span
                                                    :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                                            person.name
                                                    }}</span>

                                                <span v-if="selected"
                                                    :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </li>
                                        </ListboxOption>
                                    </ListboxOptions>
                                </transition>
                            </div>
                        </Listbox>
                    </dd>
                </div>
                <div class="py-3 sm:grid sm:grid-cols-8 sm:gap-16  text-white ">
                    <dt class="text-sm font-medium col-span-2">Application for</dt>
                    <dd class="mt-1 text-sm  sm:col-span-2 sm:mt-0 col-span-2">Backend Developer</dd>
                </div>
                <!--  <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Email address</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Salary expectation</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">$120,000</dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">About</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Fugiat ipsum ipsum deserunt culpa aute
                        sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat
                        sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit
                        ad adipisicing reprehenderit deserunt qui eu.</dd>
                </div> -->
                <!-- <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Attachments</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ul role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200">
                            <li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                <div class="flex w-0 flex-1 items-center">
                                    <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <span class="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                                </div>
                                <div class="ml-4 flex-shrink-0">
                                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                                </div>
                            </li>
                            <li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                <div class="flex w-0 flex-1 items-center">
                                    <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <span class="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                                </div>
                                <div class="ml-4 flex-shrink-0">
                                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                                </div>
                            </li>
                        </ul>
                    </dd>
                </div> -->
            </dl>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { PaperClipIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
    { id: 7, name: 'Caroline Schultz' },
    { id: 8, name: 'Mason Heaney' },
    { id: 9, name: 'Claudie Smitham' },
    { id: 10, name: 'Emil Schaefer' },
]

const selected = ref(people[3])
</script>