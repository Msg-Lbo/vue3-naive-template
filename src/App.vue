<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <n-loading-bar-provider>
        <router-view />
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/stores/config";
const configStore = useConfigStore();
const theme = computed(() => configStore.theme);

</script>

<style scoped lang="scss"></style>
