<script setup>
defineProps({
  item: {
    type: Object,
    default: () => {
      return {
        style: {
          background: "bg-yellow-200",
          progressbar: "bg-yellow-700",
          text: "text-yellow-600",
        },
        info: {
          date: "December 10, 2020",
          title: "Web Designing",
          subtitle: "Prototyping",
          progress: "90%",
          timeLeft: "2 Days Left",
          participants: [
            {
              image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
            },
          ],
        },
      };
    },
  },
});
</script>

<template>
  <div class="w-full h-full">
    <div class="rounded-xl p-4" :class="item.style.background">
      <div class="flex items-center">
        <!-- <span class="text-sm">{{ item.info.date }}</span> -->
      </div>
      <div v-if="false" class="mb-4 m-2 text-center">
        <img src="/images/1.jpg" class="object-cover h-32 w-48" />
      </div>
      <div v-else class="mb-4 mt-5 text-center">
        <p class="text-base font-bold opacity-70">{{ item.info.title }}</p>
        <p class="mt-2 text-sm opacity-70">{{ item.info.subtitle }}</p>
      </div>
      <div>
        <div class="my-2 mx-0 h-1 w-full overflow-hidden rounded-md bg-white">
          <span
            class="block h-1 rounded-md"
            :style="{ width: item.info.progress }"
            :class="[item.style.progressbar]"
          />
        </div>
        <p class="m-0 text-right text-sm font-bold">
          {{ item.info.progress }}
        </p>
      </div>
      <div class="relative flex justify-between pt-2">
        <div
          class="flex shrink-0 rounded-lg pb-2 px-4 text-sm font-bold"
          :class="item.style.text"
        >
          {{ item.info.timeLeft }}
        </div>
      </div>
    </div>
  </div>
</template>
