// vite.config.ts
import { defineConfig, loadEnv } from "file:///E:/project/practical_training_server_front/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/project/practical_training_server_front/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///E:/project/practical_training_server_front/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/project/practical_training_server_front/node_modules/unplugin-vue-components/dist/vite.mjs";
import { NaiveUiResolver } from "file:///E:/project/practical_training_server_front/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { resolve } from "path";
import { createHtmlPlugin } from "file:///E:/project/practical_training_server_front/node_modules/vite-plugin-html/dist/index.mjs";
import Unocss from "file:///E:/project/practical_training_server_front/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_dirname = "E:\\project\\practical_training_server_front";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      Unocss(),
      AutoImport({
        imports: ["vue"]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: loadEnv(mode, process.cwd())["VITE_TITLE"]
          }
        }
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./src")
      },
      extensions: [".js", ".json", ".ts", ".vue"]
    },
    server: {
      proxy: {
        "/api/pc": {
          // target: "http://10.62.1.22:8080/api/pc",
          target: "http://localhost:8080/api/pc",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/pc/, "")
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/global.scss";'
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("style.css")) {
              return "src/style.css";
            }
            if (id.includes("HelloWorld.vue")) {
              return "src/components/HelloWorld.vue";
            }
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          }
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHByYWN0aWNhbF90cmFpbmluZ19zZXJ2ZXJfZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxccHJhY3RpY2FsX3RyYWluaW5nX3NlcnZlcl9mcm9udFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovcHJvamVjdC9wcmFjdGljYWxfdHJhaW5pbmdfc2VydmVyX2Zyb250L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XHJcbmltcG9ydCB7IE5haXZlVWlSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4taHRtbFwiO1xyXG5pbXBvcnQgVW5vY3NzIGZyb20gXCJ1bm9jc3Mvdml0ZVwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICBVbm9jc3MoKSxcclxuICAgICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgaW1wb3J0czogW1widnVlXCJdLFxyXG4gICAgICB9KSxcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbTmFpdmVVaVJlc29sdmVyKCldLFxyXG4gICAgICB9KSxcclxuICAgICAgY3JlYXRlSHRtbFBsdWdpbih7XHJcbiAgICAgICAgaW5qZWN0OiB7XHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpW1wiVklURV9USVRMRVwiXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgICAgfSxcclxuICAgICAgZXh0ZW5zaW9uczogW1wiLmpzXCIsIFwiLmpzb25cIiwgXCIudHNcIiwgXCIudnVlXCJdLFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgIFwiL2FwaS9wY1wiOiB7XHJcbiAgICAgICAgICAvLyB0YXJnZXQ6IFwiaHR0cDovLzEwLjYyLjEuMjI6ODA4MC9hcGkvcGNcIixcclxuICAgICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL3BjXCIsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpXFwvcGMvLCBcIlwiKSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwiQC9zdHlsZXMvZ2xvYmFsLnNjc3NcIjsnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgbWFudWFsQ2h1bmtzKGlkOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJzdHlsZS5jc3NcIikpIHtcclxuICAgICAgICAgICAgICAvLyBcdTk3MDBcdTg5ODFcdTUzNTVcdTcyRUNcdTUyMDZcdTUyNzJcdTkwQTNcdTRFOUJcdThENDRcdTZFOTAgXHU1QzMxXHU1MTk5XHU1MjI0XHU2NUFEXHU5MDNCXHU4RjkxXHU1QzMxXHU4ODRDXHJcbiAgICAgICAgICAgICAgcmV0dXJuIFwic3JjL3N0eWxlLmNzc1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkhlbGxvV29ybGQudnVlXCIpKSB7XHJcbiAgICAgICAgICAgICAgLy8gXHU1MzU1XHU3MkVDXHU1MjA2XHU1MjcyaGVsbG8gd29ybGQudnVlXHU2NTg3XHU0RUY2XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFwic3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAvLyBcdTY3MDBcdTVDMEZcdTUzMTZcdTYyQzZcdTUyMDZcdTUzMDVcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGlkXHJcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwibm9kZV9tb2R1bGVzL1wiKVsxXVxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiL1wiKVswXVxyXG4gICAgICAgICAgICAgICAgLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1QsU0FBUyxjQUFjLGVBQWU7QUFDNVYsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsZUFBZTtBQUN4QixTQUFTLHdCQUF3QjtBQUNqQyxPQUFPLFlBQVk7QUFQbkIsSUFBTSxtQ0FBbUM7QUFVekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBLFFBQ1QsU0FBUyxDQUFDLEtBQUs7QUFBQSxNQUNqQixDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsZ0JBQWdCLENBQUM7QUFBQSxNQUMvQixDQUFDO0FBQUEsTUFDRCxpQkFBaUI7QUFBQSxRQUNmLFFBQVE7QUFBQSxVQUNOLE1BQU07QUFBQSxZQUNKLE9BQU8sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDLEVBQUUsWUFBWTtBQUFBLFVBQ2xEO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDakM7QUFBQSxNQUNBLFlBQVksQ0FBQyxPQUFPLFNBQVMsT0FBTyxNQUFNO0FBQUEsSUFDNUM7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLFdBQVc7QUFBQTtBQUFBLFVBRVQsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLGNBQWMsRUFBRTtBQUFBLFFBQ2xEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGFBQWEsSUFBaUI7QUFDNUIsZ0JBQUksR0FBRyxTQUFTLFdBQVcsR0FBRztBQUU1QixxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsZ0JBQWdCLEdBQUc7QUFFakMscUJBQU87QUFBQSxZQUNUO0FBRUEsZ0JBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixxQkFBTyxHQUNKLFNBQVMsRUFDVCxNQUFNLGVBQWUsRUFBRSxDQUFDLEVBQ3hCLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFDWixTQUFTO0FBQUEsWUFDZDtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
