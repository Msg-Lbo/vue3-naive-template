import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

// IconPark 自定义解析器
const IconParkResolver = () => ({
  type: 'component' as const,
  resolve: (name: string) => {
    // 排除 Vue Router 和 Naive UI 组件
    const excludePatterns = [
      /^Router/,
      /^N[A-Z]/,
      /^n-/
    ];
    
    if (name.match(/^[A-Z]/) && !excludePatterns.some(pattern => pattern.test(name))) {
      return {
        name: name,
        from: '@icon-park/vue-next',
      }
    }
  },
})
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver(), IconParkResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
