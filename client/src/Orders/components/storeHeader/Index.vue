<template>
  <header>
    <nav class="mx-auto max-w-full px-2 sm:px-3 lg:px-4" aria-label="Top">
      <div
        class="flex w-full items-center justify-between border-b border-gray-500 py-1 lg:border-none"
      >
        <div class="flex items-center">
          <div
            class="group w-full md:w-[450px] relative flex flex-1 flex-grow items-center"
          >
            <div
              class="absolute flex cursor-pointer items-center justify-center text-sm uppercase text-gray-500 sm:hidden"
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
              class="pointer-events-none absolute left-0 ml-4 hidden h-5 w-5 fill-current text-gray-500 group-hover:text-gray-400 sm:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
              />
            </svg>
            <input
              type="text"
              class="bg-gray-700 w-full placeholder:text-xl rounded-md pl-16 pr-4 leading-3 text-xl text-white focus:outline-none focus:border-transparent"
              placeholder="Search"
            />
          </div>
        </div>
        <div class="flex items-center">
          <div class="hidden space-x-8 xl:block">
            <a
              v-for="link in navigation"
              :key="link.name"
              :href="link.href"
              class="text-base font-medium text-white hover:text-indigo-50"
              >{{ link.name }}</a
            >
          </div>
        </div>
        <div class="flex justify-center items-center space-x-4">
          <a
            href="#"
            class="flex justify-center items-center h-10 w-10 md:w-24 rounded-full md:rounded-sm border border-transparent bg-gray-900 px-2 text-base font-medium text-white hover:bg-gray-600"
            ><span class="md:hidden block">+</span>
            <span class="hidden md:block">Save sale</span></a
          >
          <a
            href="#"
            class="flex justify-center items-center h-10 w-10 md:w-24 rounded-full md:rounded-sm border border-transparent bg-green-600 px-2 text-base font-medium text-white hover:bg-green-500"
            ><span class="md:hidden block">+</span>
            <span class="hidden md:block">Payment</span></a
          >
          <a
            href="#"
            class="flex justify-center items-center h-10 w-10 md:w-24 rounded-full md:rounded-sm border border-transparent bg-gray-900 px-2 text-base font-medium text-white hover:bg-gray-600"
          >
            <span class="md:hidden block">+</span>
            <span class="hidden md:block">Cash</span>
          </a>
        </div>
      </div>
      <div class="flex flex-wrap justify-center pb-2 space-x-6 lg:hidden">
        <a
          v-for="link in navigation"
          :key="link.name"
          :href="link.href"
          class="text-base font-medium text-white hover:text-indigo-50"
          >{{ link.name }}</a
        >
      </div>
    </nav>
  </header>
</template>

<script setup>
const navigation = [
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
];
</script>
