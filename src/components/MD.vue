<!-- WysiwygEditor.vue -->
<template>
  <!-- {{ modelValue }}
  <div>
    <div class="flex flex-wrap">
      <button @click="applyBold" class="button">加粗</button>
      <button @click="applyItalic" class="button">斜体</button>
      <button @click="applyHeading" class="button">标题</button>
      <button @click="applyUl" class="button">无序列表</button>
      <button @click="applyOl" class="button">有序列表</button>
      <button @click="undo" class="button">回退</button>
      <button @click="redo" class="button">取消回退</button>
    </div>
    <div
      v-html="modelValue"
      contenteditable="true"
      class="outline-none border-2 p-4 rounded-lg border-gray-300 focus:border-green-300"
    ></div>
  </div> -->
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
const emit = defineEmits(["input"]);
const props = defineProps({
  modelValue: {
    type: String,
    require: true,
  },
});
</script>

<style></style>
