<script setup>
import { computed, inject } from "vue";
import { useRouter } from "vue-router";
import {
  Bars3BottomLeftIcon,
  ArrowLeftIcon,
} from '@heroicons/vue/24/outline'
import UserNavigation from "@/dashboard/userNavigation/Index.vue";
// import { LoginIcon } from "@heroicons/vue/24/solid"
import { useUserStore } from "@/stores/user";

const store = useUserStore();
const router = useRouter()
const curentPath = computed(() => router.currentRoute.value.matched.map(link => link.name))

const goBackToStore = () => {
  if (store.activeNumber) {
    router.push(`store/order/${store.activeNumber}`)
  } else {
    router.push('/store')
  }
}

const toggle = inject("toggle");
const toggleSettingsSidebar = inject("toggleSettingsSidebar")
</script>

<template>
  <header class="relative z-10 py-2 items-center bg-zinc-900">
    <div class="relative z-10 mx-auto flex h-full flex-col justify-center px-3 text-white">
      <div class="relative flex w-full items-center pl-1 sm:ml-0 sm:pr-2">
        <div class="group relative flex h-full w-12 items-center lg:hidden">
          <!-- <button type="button" class="text-4xl text-white focus:outline-none" @mouseenter="toggle">
            &#8801;
          </button> -->
          <button type="button" class=" px-4 text-white focus:outline-none  md:hidden" @click="toggleSettingsSidebar">
            <span class="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon class="h-6 w-6" aria-hidden="true" />
          </button>

        </div>
        <!-- <div class="container relative left-0 flex h-full w-5/6"> -->
        <div class="w-full h-full  flex justify-start items-center">
          <span @click="goBackToStore" class="pb-2 p-4 text-white">
            <ArrowLeftIcon class="h-8 w-8" />
          </span>
          <h1 class="text-xl text-white capitalize">{{ curentPath.join(' - ') }}</h1>
        </div>
        <div class="relative ml-5 flex w-full items-center justify-end p-1 sm:right-auto sm:mr-0">
          <span class="isolate inline-flex shadow-sm mr-16 space-x-6">
            <Suspense>
              <label v-if="store.useCashRegister"
                class="relative -ml-px inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white">
                {{ store.useCashRegister.name }}
              </label>
              <template #fallback>
                <label
                  class="relative -ml-px inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white">
                  Loading...
                </label>
              </template>
            </Suspense>
          </span>
          <a href="#" class="block pr-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </a>
          <a href="#" class="block pr-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
          <a href="#" class="relative block pr-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </a>

          <UserNavigation v-if="store.signedIn" />
          <router-link v-else to="/login" class="relative block pr-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>
