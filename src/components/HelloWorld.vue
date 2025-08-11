<template>
  <MD v-model="text"></MD>

  {{ text }}
</template>
<script setup lang="ts">
import { ref, h } from "vue";
import MD from "./MD.vue";

const text = ref("helloWorld");
</script>
<style scoped></style>
