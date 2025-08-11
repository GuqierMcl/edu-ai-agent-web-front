import { defineConfig, presetAttributify, presetUno } from "unocss";

export default defineConfig({
  // ...UnoCSS选项
  presets: [presetUno(), presetAttributify()],
  shortcuts: [
    ["full", "w-full h-full"],
    ["align-center", "items-center"],
    ["f-c-c", "flex justify-center items-center"],
    ["f-b-c", "flex justify-between items-center"],
    ["f-a-c", "flex justify-around items-center"],
    ["f-e-c", "flex justify-evenly items-center"],
    ["f-y-c", "flex items-center"],
    ["f-x-c", "flex justify-evenly"],
    ["flex-col", "flex flex-col"],
    ["text-bold", "font-bold"],
  ],
  rules: [
    [/^bc-(.+)$/, ([, color]) => ({ "border-color": `#${color}` })],
    [/^line-height-(\d+)$/, ([, num]) => ({ "line-height": `${num}px` })],
    [/^w-(\d+)p$/, ([, num]) => ({ "width": `${num}%` })],
    [/^h-(\d+)p$/, ([, num]) => ({ "height": `${num}%` })],
    [/^anmt-(.+)$/, ([, time]) => ({ "animation-duration": time })],
    [/^flex-(.+)$/, ([, num]) => ({ "flex": num })],
    [
      /^text-hidden-(.+)$/,
      ([, number]) => ({
        "-webkit-line-clamp": number,
        overflow: "hidden",
        "text-overflow": "ellipsis",
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
      }),
    ],
  ],
  theme: {
    colors: {
      dark: "#18181c",
    },
  },
});
