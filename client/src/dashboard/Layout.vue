<script setup>
import TopNavigation from "./topnavigation/Index.vue";
import SideNavigation from "./sidenavigation/Index.vue";
import DashboardProvider from "./provider/Provider.vue";
import Overlay from "@/dashboard/provider/Overlay.vue";

</script>

<template>
  <DashboardProvider>
    <div class=" flex flex-col items-start overflow-auto">
      <Overlay />
      <SideNavigation mobile-position="left" />
      <div class="relative w-full pl-0 lg:pl-20">
        <TopNavigation class="absolute top-0" />

        <main class=" h-screen mx-4">
          <slot />
        </main>
      </div>
    </div>
  </DashboardProvider>
</template>
