<template>
  <PWAPrompt/>
  <HeaderApp @setTab="setTab"/>
  <ReadyValues v-if="activeTab === 0"/>
  <PercentValues v-if="activeTab === 1"/>
  <CustomFood v-if="activeTab === 2"/>
</template>
<script setup lang="ts">
import HeaderApp from "@/components/HeaderApp.vue";
import ReadyValues from "@/views/ReadyValues.vue";
import PercentValues from "@/views/PercentValues.vue";
import CustomFood from "@/views/CustomFood.vue";
import PWAPrompt from "@/components/PWAPrompt.vue";
import {ref} from "vue";
const activeTab = ref(0);
const setTab = (tab: number) => {
  activeTab.value = tab;
}
</script>