<template>
  <n-layout style="min-height: 100vh">
    <n-layout-header class="flex px-5" style="height: 64px" bordered>
      <header class="flex items-center justify-between w-full">
        <div class="left"></div>
        <div class="right cursor-pointer">
          <moon v-if="configStore.theme === null" theme="outline" size="24" @click="toggleTheme" />
          <sun-one v-else theme="outline" size="24" @click="toggleTheme" />
        </div>
      </header>
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
      <n-layout-sider content-style="padding: 24px;" :native-scrollbar="false" bordered>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false">
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px; padding: 24px" bordered> 城府路 </n-layout-footer>
  </n-layout>
</template>
<script setup lang="ts">
import { useConfigStore } from "@/stores/config";
const configStore = useConfigStore();
const toggleTheme = () => {
  configStore.toggleTheme();
};
</script>

<style scoped lang="scss"></style>
