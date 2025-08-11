<template>
  <ScrollX ref="scrollXRef" class="bg-white dark:bg-dark!">
    <n-tag
      v-for="tag in tagsStore.tags"
      ref="tabRefs"
      :key="tag.routeName"
      class="mx-5 cursor-pointer rounded-4 px-15 hover:color-primary"
      :type="tagsStore.activeTagName === tag.routeName ? 'primary' : 'default'"
      :closable="tagsStore.tags.length > 1"
      @click="handleTagClick(tag.routeName)"
      @close.stop="tagsStore.removeTag(tag.routeName)"
      @contextmenu.prevent="handleContextMenu($event, tag)"
    >
      <template #icon>
        <n-icon size="16" :component="tag.icon" />
      </template>
      {{ tag.title }}
    </n-tag>
    <ContextMenu
      v-if="contextMenuOption.show"
      v-model:show="contextMenuOption.show"
      :cur-name="contextMenuOption.curName"
      :x="contextMenuOption.x"
      :y="contextMenuOption.y"
    />
  </ScrollX>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, nextTick } from "vue";
import type { Component } from "vue";
import { useRoute, useRouter } from "vue-router";
import ContextMenu from "./ContextMenu.vue";
import { useTagsStore } from "@/store";
import ScrollX from "@/components/common/ScrollX.vue";

const route = useRoute();
const router = useRouter();
const tagsStore = useTagsStore();
const tabRefs = ref<HTMLDivElement[]>([]);
const scrollXRef = ref<HTMLElement>();

const contextMenuOption = reactive({
  show: false,
  x: 0,
  y: 0,
  curName: "",
});

watch(
  () => route.path,
  () => {
    const routeName = route.name as string;
    const title = route.meta!.title as string;
    const icon = route.meta!.icon as Component;
    tagsStore.addTag({ routeName, title, icon });
  },
  { immediate: true }
);

// 使当前标签滚动至可视区域
watch(
  () => tagsStore.activeIndex,
  async (activeIndex) => {
    await nextTick();
    // @ts-ignore
    const activeTabElement = tabRefs.value[activeIndex]?.$el;
    if (!activeTabElement) return;
    const { offsetLeft: x, offsetWidth: width } = activeTabElement;
    // @ts-ignore
    scrollXRef.value.handleScroll(x + width, width);
  },
  { immediate: true }
);

const handleTagClick = (routeName: string) => {
  tagsStore.setActiveTag(routeName);
  router.push({ name: routeName });
};

function showContextMenu() {
  contextMenuOption.show = true;
}
function hideContextMenu() {
  contextMenuOption.show = false;
}
function setContextMenu(x: number, y: number, curName: string) {
  Object.assign(contextMenuOption, { x, y, curName });
}

// 右击菜单
async function handleContextMenu(e: MouseEvent, tagItem: Page.Tag) {
  const { clientX, clientY } = e;
  hideContextMenu();
  setContextMenu(clientX, clientY, tagItem.routeName);
  await nextTick();
  showContextMenu();
}
</script>

<style>
.n-tag__close {
  box-sizing: content-box;
  border-radius: 50%;
  font-size: 12px;
  padding: 2px;
  transform: scale(0.9);
  transform: translateX(5px);
  transition: all 0.3s;
}
</style>
