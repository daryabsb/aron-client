<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
    <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-gray-100">
      <body class="h-full">
      ```
    -->
    <div class="h-full pb-24 border-t border-gray-500">
        <TransitionRoot as="template" :show="open">
            <Dialog as="div" class="relative z-40 md:hidden" @close="toggleSettingsSidebar">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="absolute top-0 right-0 -mr-12 pt-2">
                                    <button type="button"
                                        class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        @click="toggleSettingsSidebar">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div class="flex flex-shrink-0 items-center px-4">
                                <img class="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                    alt="Your Company" />
                            </div>
                            <div class="mt-5 h-0 flex-1 overflow-y-auto">
                                <nav class="space-y-1 px-2">
                                    <a v-for="item in navigation" :key="item.name" :href="item.href"
                                        :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']">
                                        <component :is="item.icon"
                                            :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-4 flex-shrink-0 h-6 w-6']"
                                            aria-hidden="true" />
                                        {{ item.name }}
                                    </a>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                    <div class="w-14 flex-shrink-0" aria-hidden="true">
                        <!-- Dummy element to force sidebar to shrink to fit close icon -->
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>


        <div class="flex flex-col h-full w-full">
            <!-- <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">


            </div> -->
            <div class="flex h-full">
                <!-- Static sidebar for desktop -->
                <div class="hidden md:flex md:w-64 md:flex-col overflow-hidden">
                    <!-- Sidebar component, swap this element with another sidebar if you like -->
                    <div class="flex min-h-0 flex-1 flex-col bg-zinc-900 ">

                        <div class="flex flex-1 flex-col">
                            <nav class="flex-1 space-y-1 px-4 py-4">
                                <router-link v-for="item in navigation" :key="item.name" :to="item.to"
                                    v-slot="{ isActive, href, navigate }">
                                    <!-- <component :is="item.icon"
                                        :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']"
                                        aria-hidden="true" /> -->
                                    <a :href="href" :class="[
                                        isActive
                                            ? 'bg-zinc-800 text-white'
                                            : 'text-gray-300 hover:bg-zinc-900 hover:text-white',
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                    ]" @click="navigate">{{ item.name }}</a>

                                </router-link>
                            </nav>
                        </div>
                    </div>
                </div>

                <main class="h-full flex w-full overflow-auto scrollbar">

                    <div class=" w-full p-4">
                        <div class=" h-full w-full ">
                            <router-view></router-view>
                        </div>
                    </div>
                </main>



            </div>
            <div class=" flex justify-end items-center py-2  px-12 border-t border-gray-500 inset-y-0 space-x-8">
                <button class="bg-green-500 text-white hover:bg-green-300 h-10 w-24 capitalize"
                    @click="submitSettings">save</button>
                <button class="bg-red-500 text-white hover:bg-red-300 h-10 w-24 capitalize"
                    @click="$router.push('/store')">cancel</button>
            </div>

        </div>
    </div>
</template>
  
<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/Orders/ordersStore'
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    Bars3BottomLeftIcon,
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    XMarkIcon,
    ArrowLeftIcon,
} from '@heroicons/vue/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
const store = useOrderStore()
const router = useRouter()
const curentPath = router.currentRoute.value.matched.map(link => link.name)
console.log(curentPath);
const open = inject("openSettingsSidebar")
const toggleSettingsSidebar = inject("toggleSettingsSidebar")

const submitSettings = () => {
    console.log("SETTING SAVED")
    router.push('/store')
}

const navigation = [
    { name: 'Genera', to: '/settings/general', icon: HomeIcon, current: true },
    { name: 'Order & payment', to: '/settings/orders', icon: UsersIcon, current: false },
    { name: 'Products settings', to: '/settings/products', icon: FolderIcon, current: false },
    { name: 'Weighing scale', to: '/settings/weighing-scale', icon: CalendarIcon, current: false },
    { name: 'Customer display', to: '/settings/customers', icon: InboxIcon, current: false },
    { name: 'Email settings', to: '/settings/emails', icon: ChartBarIcon, current: false },
    { name: 'Print options', to: '/settings/prints', icon: ChartBarIcon, current: false },
    { name: 'Database', to: '/settings/database', icon: ChartBarIcon, current: false },
    { name: 'License', to: '/settings/license', icon: ChartBarIcon, current: false },
    { name: 'About', to: '/settings/about', icon: ChartBarIcon, current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

const sidebarOpen = ref(false)
</script>