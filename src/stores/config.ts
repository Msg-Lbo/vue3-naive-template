import { defineStore } from "pinia";
import { ref } from "vue";
import { darkTheme } from "naive-ui";

export const useConfigStore = defineStore("config", () => {
  // 从 localStorage 读取主题设置，默认为亮色主题
  const savedTheme = localStorage.getItem("theme");
  const theme = ref<typeof darkTheme | null>(
    savedTheme === "dark" ? darkTheme : null
  );

  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === null ? darkTheme : null;
    // 保存到 localStorage
    localStorage.setItem("theme", theme.value === null ? "light" : "dark");
  };

  return {
    theme,
    toggleTheme,
  };
});
