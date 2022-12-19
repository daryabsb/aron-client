<script setup>
import SidenavItem from "./Item.vue";

/* ICONS */
import HomeIcon from "./icons/Home.vue";
import StatusIcon from "./icons/Status.vue";
import CreditsIcon from "./icons/Credits.vue";
import SettingsIcon from "./icons/Settings.vue";
import ArchivesIcon from "./icons/Archives.vue";
import DocumentationIcon from "./icons/Documentation.vue";
</script>

<template>
  <ul class="md:pl-3">
    <SidenavItem title="Home" to="/store">
      <HomeIcon />
    </SidenavItem>

    <SidenavItem title="Status" to="/admin/status">
      <StatusIcon />
    </SidenavItem>

    <SidenavItem title="Archives" to="/admin/archives">
      <ArchivesIcon />
    </SidenavItem>

    <SidenavItem title="Credits" to="/admin/credits">
      <CreditsIcon />
    </SidenavItem>

    <SidenavItem title="Settings" to="/settings">
      <SettingsIcon />
    </SidenavItem>

    <SidenavItem title="Documentation" to="/admin/documentation">
      <DocumentationIcon />
    </SidenavItem>
  </ul>
</template>
