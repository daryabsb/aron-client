<script setup>
import OrderItem from "./OrderItem.vue";

const data = [
  {
    name: "I got your first it was quite good.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
    text: "I got your first assignment. It was quite good. 🥳.",
    date: "Dec, 12",
  },
  {
    name: "Mark",
    image:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
    text: "Hey, tell  about progress of project? waiting for response.",
    date: "Dec, 12",
  },
  {
    name: "David",
    image:
      "https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDZ8fG1hbnxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    text:
      "Hey, can tell me about progress of project? I'm waiting for your response.",
    date: "Dec, 12",
  },
  {
    name: "Mark",
    image:
      "https://images.unsplash.com/photo-1533993192821-2cce3a8267d1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWFuJTIwbW9kZXJufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    text: "I am really impressed! Can't wait to see the final result.",
    date: "Dec, 12",
  },
  {
    name: "Mark",
    image:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
    text: "Hey, tell  about progress of project? waiting for response.",
    date: "Dec, 12",
  },
  {
    name: "David",
    image:
      "https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDZ8fG1hbnxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    text:
      "Hey, can tell me about progress of project? I'm waiting for your response.",
    date: "Dec, 12",
  },
  {
    name: "Mark",
    image:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
    text: "Hey, tell  about progress of project? waiting for response.",
    date: "Dec, 12",
  },
  {
    name: "David",
    image:
      "https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDZ8fG1hbnxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    text:
      "Hey, can tell me about progress of project? I'm waiting for your response.",
    date: "Dec, 12",
  },
  {
    name: "Mark",
    image:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
    text: "Hey, tell  about progress of project? waiting for response.",
    date: "Dec, 12",
  },
  {
    name: "David",
    image:
      "https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDZ8fG1hbnxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    text:
      "Hey, can tell me about progress of project? I'm waiting for your response.",
    date: "Dec, 12",
  },
  {
    name: "Mark",
    image:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
    text: "Hey, tell  about progress of project? waiting for response.",
    date: "Dec, 12",
  },
  {
    name: "David",
    image:
      "https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDZ8fG1hbnxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    text:
      "Hey, can tell me about progress of project? I'm waiting for your response.",
    date: "Dec, 12",
  },
];
</script>

<template>
  <div
    class="relative h-full flex flex-col rounded-3xl bg-gray-800 px-6 py-6 overflow-auto scrollbar"
  >
    <span
      class="sticky flex justify-start border-b border-gray-500 py-3 space-x-2 items-center shadow-sm"
    >
      <button
        type="button"
        class="relative items-center rounded-sm w-24 justify-center bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-300 hover:text-black focus:z-10"
      >
        Delete
      </button>
      <button
        type="button"
        class="relative -ml-px items-center border w-24 justify-center rounded-sm border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10"
      >
        Quantity
      </button>

      <button
        type="button"
        class="relative truncate flex-grow -ml-px items-center rounded-sm border w-24 justify-center border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10"
      >
        ORDER-221126-01-1432
      </button>
    </span>

    <div class="max-h-[45em] inset-0 overflow-auto scrollbar mt-2">
      <Message v-for="item in data" :key="item.id" :item="item" />
    </div>
  </div>
</template>
