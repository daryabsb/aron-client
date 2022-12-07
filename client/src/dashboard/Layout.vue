<script setup>
import Overlay from './provider/Overlay.vue';
import TopNavigation from './topnavigation/Index.vue';
import SideNavigation from './sidenavigation/Index.vue';
import DashboardProvider from './provider/Provider.vue';
</script>

<template>
  <DashboardProvider>

    <div class="flex items-start overflow-auto">
      <!-- <Overlay /> -->
      <SideNavigation mobile-position="left" />
      <div class="relative w-full pl-0  lg:pl-20">
        <TopNavigation class="absolute top-0" />
        <main class="h-full">
          <slot />
        </main>
      </div>
    </div>

  </DashboardProvider>
</template>
