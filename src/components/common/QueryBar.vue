<template>

</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface QueryParams {
  account: string;
  name: string;
}
const queryParams = ref<QueryParams>();

const init = () => {
  queryParams.value = {
    account: "",
    name: "",
  };
};
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped></style>
