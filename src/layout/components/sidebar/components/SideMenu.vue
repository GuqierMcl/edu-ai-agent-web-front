<template>
  <n-menu
    ref="menu"
    class="side-menu"
    accordion
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="64"
    :options="menuOptions"
    v-model:value="activeKey"
    @update:value="handleMenuSelect"
  />
</template>

<script lang="ts" setup>
import { ref, watch, h, computed, nextTick } from "vue";
import { usePermissionStore, useAppStore } from "@/store";
import { renderIcon, isExternal } from "@/utils";
import { useRoute, useRouter } from "vue-router";
import type { MenuOption } from "naive-ui";
import Route from "@/types/route";

const router = useRouter();
const curRoute = useRoute();
const permissionStore = usePermissionStore();
const appStore = useAppStore();

const activeKey = computed(() => curRoute.meta?.activeMenu || curRoute.name);

type MyMenuOption = MenuOption & {
  order: number;
  path: string;
};

// 使用router映射生成相应的菜单（isHidden=false）
const menuOptions = computed(() => {
  return permissionStore.menus
    .map((item: Route.Row) => getMenuItem(item))
    .sort((a: MyMenuOption, b: MyMenuOption) => a.order - b.order);
});

const menu = ref();
watch(curRoute, async () => {
  await nextTick();
  menu.value?.showOption();
});

// 若是外部链接直接返回链接，否则返回对应的name，使用name进行跳转
function resolvePath(path: string, name: string) {
  return isExternal(path) ? path : name;
}

// 递归处理route -> option
const getMenuItem = (route: Route.Row): MyMenuOption => {
  let menuItem: MyMenuOption = {
    label: (route.meta && route.meta!.title) || route.name,
    key: route.name,
    path: resolvePath(route.path, route.name),
    // @ts-ignore
    icon: getIcon(route.meta),
    order: route.meta?.order || 0,
  };

  const visibleChildren = route.children
    ? route.children.filter((item: Route.Row) => item.name && !item.hidden)
    : [];

  // 没有子路由时退出递归
  if (!visibleChildren.length) return menuItem;

  if (visibleChildren.length === 1) {
    // 单个子路由，覆盖父路由（不显示Layout）
    const singleRoute = visibleChildren[0];
    menuItem = {
      ...menuItem,
      label: singleRoute.meta!.title,
      key: singleRoute.name,
      path: resolvePath(singleRoute.path, singleRoute.name),
      // @ts-ignore
      icon: getIcon(singleRoute.meta),
    };

    const visibleItems = singleRoute.children
      ? singleRoute.children.filter(
          (item: Route.Row) => item.name && !item.hidden
        )
      : [];

    if (visibleItems.length === 1) {
      menuItem = getMenuItem(visibleItems[0]);
    } else if (visibleItems.length > 1) {
      menuItem.children = visibleItems
        .map((item: Route.Row) => getMenuItem(item))
        .sort((a: MyMenuOption, b: MyMenuOption) => a.order - b.order);
    }
  } else {
    menuItem.children = visibleChildren
      .map((item: Route.Row) => getMenuItem(item))
      .sort((a: MyMenuOption, b: MyMenuOption) => a.order - b.order);
  }

  // menuItem.children = visibleChildren
  //   .map((item: Route.Row) => getMenuItem(item))
  //   .sort((a: MyMenuOption, b: MyMenuOption) => a.order - b.order);
  return menuItem;
};

const getIcon = (meta: any) => {
  if (meta?.icon) return renderIcon(meta.icon, { size: "18px" });
  return null;
};

const handleMenuSelect = (key: string, item: MyMenuOption) => {
  if (isExternal(item.path)) {
    // 若是外部链接，新开页面
    window.open(item.path);
  } else {
    if (item.path === curRoute.path) {
      appStore.reloadPage();
    } else {
      router.push({ name: item.path });
    }
  }
};
</script>

<style lang="scss">
.side-menu:not(.n-menu--collapsed) {
  .n-menu-item-content {
    &::before {
      left: 5px;
      right: 5px;
    }
    &.n-menu-item-content--selected,
    &:hover {
      &::before {
        border-left: 4px solid var(--primary-color);
      }
    }
  }
}
</style>
