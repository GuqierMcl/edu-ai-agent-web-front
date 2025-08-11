import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      Unocss(),
      AutoImport({
        imports: ["vue"],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: loadEnv(mode, process.cwd())["VITE_TITLE"],
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
      extensions: [".js", ".json", ".ts", ".vue"],
    },
    server: {
      proxy: {
        "/api/pc": {
          // target: "http://10.62.1.22:8080/api/pc",
          target: "http://localhost:8080/api/pc",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/pc/, ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/global.scss";',
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any): string {
            if (id.includes("style.css")) {
              // 需要单独分割那些资源 就写判断逻辑就行
              return "src/style.css";
            }
            if (id.includes("HelloWorld.vue")) {
              // 单独分割hello world.vue文件
              return "src/components/HelloWorld.vue";
            }
            // // 最小化拆分包
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
  };
});
