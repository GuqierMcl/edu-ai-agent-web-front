<template>
  <n-dropdown
    :show="show"
    :options="options"
    trigger="manual"
    :x="x"
    :y="y"
    placement="bottom-start"
    @clickoutside="handleHideDropdown"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useTagsStore, useAppStore } from "@/store";
import { renderIcon } from "@/utils";
import {
  RefreshRound,
  CloseRound,
  CompareArrowsRound,
  KeyboardDoubleArrowLeftRound,
  KeyboardDoubleArrowRightRound,
} from "@vicons/material";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  curName: {
    type: String,
    default: "",
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update:show"]);

const tagsStore = useTagsStore();
const appStore = useAppStore();

const options = computed(() => [
  {
    label: "重新加载",
    key: "reload",
    disabled: props.curName !== tagsStore.activeTagName,
    icon: renderIcon(RefreshRound, { size: "14px" }),
  },
  {
    label: "关闭",
    key: "close",
    disabled: tagsStore.tags.length <= 1,
    icon: renderIcon(CloseRound, { size: "14px" }),
  },
  {
    label: "关闭其他",
    key: "close-other",
    disabled: tagsStore.tags.length <= 1,
    icon: renderIcon(CompareArrowsRound, { size: "14px" }),
  },
  {
    label: "关闭左侧",
    key: "close-left",
    disabled:
      tagsStore.tags.length <= 1 ||
      props.curName === tagsStore.tags[0].routeName,
    icon: renderIcon(KeyboardDoubleArrowLeftRound, { size: "14px" }),
  },
  {
    label: "关闭右侧",
    key: "close-right",
    disabled:
      tagsStore.tags.length <= 1 ||
      props.curName === tagsStore.tags[tagsStore.tags.length - 1].routeName,
    icon: renderIcon(KeyboardDoubleArrowRightRound, { size: "14px" }),
  },
]);

const route = useRoute();
const actionMap = new Map([
  [
    "reload",
    () => {
      if (route.meta?.keepAlive) {
        // 重置keepAlive
        appStore.setAliveKeys(route.name as string, +new Date());
      }
      appStore.reloadPage();
    },
  ],
  [
    "close",
    () => {
      tagsStore.removeTag(props.curName);
    },
  ],
  [
    "close-other",
    () => {
      tagsStore.removeOther(props.curName);
    },
  ],
  [
    "close-left",
    () => {
      tagsStore.removeLeft(props.curName);
    },
  ],
  [
    "close-right",
    () => {
      tagsStore.removeRight(props.curName);
    },
  ],
]);

const handleHideDropdown = () => {
  emit("update:show", false);
};

const handleSelect = (key: string) => {
  const actionFn = actionMap.get(key);

  actionFn && actionFn();
  handleHideDropdown();
};
</script>
