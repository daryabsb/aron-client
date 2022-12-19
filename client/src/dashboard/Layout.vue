<script setup>
import TopNavigation from "./topnavigation/Index.vue";
import SideNavigation from "./sidenavigation/Index.vue";
import DashboardProvider from "./provider/Provider.vue";
import Overlay from "@/dashboard/provider/Overlay.vue";
import Modals from "@/dashboard/provider/Modals.vue";
</script>

<template>
  <DashboardProvider>

    <div class="flex flex-col items-start overflow-auto">
      <Overlay />
      <Modals />
      <!-- <SideNavigation mobile-position="left" /> -->
      <div class="relative w-full">
        <TopNavigation class="absolute top-0" />

        <main class="h-screen">
          <slot />
        </main>
      </div>
    </div>
  </DashboardProvider>
</template>
