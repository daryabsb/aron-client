<script setup>
import { nextTick } from "vue";
import MessageBoard from "../components/contents/MessageBoard.vue";
import ContentContainer from "../components/contents/ContentContainer.vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="flex flex-nowrap">
    <div class="w-full rounded-xl bg-gray-800 px-6 pb-6 lg:w-8/12 mx-4">
      <div class="flex items-center mb-2 text-white border-b border-gray-500">
        <!-- <div class="container relative left-0 flex h-full"> -->
        <div class="group relative w-full mb-4 hidden items-center md:flex">
          <div
            class="absolute flex w-auto cursor-pointer items-center justify-center p-3 pr-2 text-sm uppercase text-gray-500 sm:hidden"
          >
            <svg
              fill="none"
              class="relative h-5 w-5"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <svg
            class="pointer-events-none absolute left-0 ml-4 hidden h-4 w-4 fill-current text-gray-500 group-hover:text-gray-400 sm:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
            />
          </svg>
          <input
            type="text"
            class="w-full h-20 rounded-sm bg-gray-800 py-1.5 pl-10 pr-4 leading-normal text-gray-400 focus:outline-none focus:border-transparent"
            placeholder="Search"
          />
        </div>
        <!-- </div> -->
      </div>
      <div class="flex flex-wrap items-center justify-between pb-8">
        <div class="flex flex-wrap text-white">
          <div class="pr-6 mr-16">
            <div class="">Subtotal</div>
            <div class="text-2xl font-bold">450000</div>
          </div>
          <div class="pr-10">
            <div class="">Discounted</div>
            <div class="text-2xl font-bold">24</div>
          </div>
          <div class="pr-10">
            <div class="">Tax</div>
            <div class="text-2xl font-bold">24000</div>
          </div>
          <div>
            <div class="">Grand Total</div>
            <div class="text-2xl font-bold">620250</div>
          </div>
        </div>
        <div class="mt-4 flex items-center md:mt-0">
          <button class="bg-transparent text-white" title="List View">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
          <button class="ml-2 bg-gray-700 p-2 text-white" title="Grid View">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
        </div>
      </div>

      <ContentContainer />
    </div>
    <div class="mr-2">
      <MessageBoard />
    </div>
  </div>
</template>
