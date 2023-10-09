<template>
  <header class="header">
    <div class="container">
      <va-tabs v-model="activeTab" :vertical="vertical">
        <template #tabs>
          <va-tab
              v-for="tab in tabs"
              :key="tab"
          >
            {{ tab.name }}
          </va-tab>
        </template>
      </va-tabs>
    </div>
  </header>
</template>
<script setup>
import {onMounted, ref, watch} from "vue";
const emit = defineEmits(['setTab'])
const activeTab = ref(0);
const vertical = ref(false);
const tabs = [
  {name: 'Калькулятор готовых значений', id: 0},
  {name: 'Калькулятор от готовый еды', id: 1},
  {name: 'Калькулятор кастомной еды', id: 2}
]
watch(activeTab, (newValue, oldValue) => {
  emit('setTab', newValue);
}, { immediate: true })
onMounted(() => {
  window.addEventListener('resize', () => {
    vertical.value = window.innerWidth < 700;
  })
  vertical.value = window.innerWidth < 700;
})
</script>
<style>
.container {
  max-width: 1230px;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  margin: 0 auto;
}
.header {
  padding: 30px 0;
}
</style>
