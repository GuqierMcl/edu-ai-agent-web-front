<template>
  <div
    ref="wrapper"
    class="wrapper px-10"
    @mousewheel.prevent="handleMouseWheel"
  >
    <div
      class="left left-0 f-c-c"
      @click="handleMouseWheel({ wheelDelta: 120 })"
    >
      <NIcon size="18">
        <ChevronLeftRound></ChevronLeftRound>
      </NIcon>
    </div>
    <div
      class="right right-0 f-c-c"
      @click="handleMouseWheel({ wheelDelta: -120 })"
    >
      <NIcon size="18">
        <ChevronRightRound></ChevronRightRound>
      </NIcon>
    </div>

    <div
      ref="content"
      class="content overflow"
      :style="{
        transform: `translateX(${translateX}px)`,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { debounce } from "@/utils";
import { NIcon } from "naive-ui";
import { ChevronLeftRound, ChevronRightRound } from "@vicons/material";

const translateX = ref<number>(0);
const content = ref<HTMLElement>();
const wrapper = ref<HTMLElement>();

function handleMouseWheel(e: { wheelDelta: number }) {
  const { wheelDelta } = e;
  const wrapperWidth = wrapper.value!.offsetWidth;
  const contentWidth = content.value!.offsetWidth;
  /**
   * @wheelDelta 平行滚动的值 >0： 右移  <0: 左移
   * @translateX 内容translateX的值
   * @wrapperWidth 容器的宽度
   * @contentWidth 内容的宽度
   */
  if (wheelDelta < 0) {
    if (wrapperWidth > contentWidth && translateX.value < -10) return;
    if (
      wrapperWidth <= contentWidth &&
      contentWidth + translateX.value - wrapperWidth < -10
    )
      return;
  }
  if (wheelDelta > 0 && translateX.value > 10) {
    return;
  }

  translateX.value += wheelDelta;
  resetTranslateX(wrapperWidth, contentWidth);
}

const resetTranslateX = debounce(
  (wrapperWidth: number, contentWidth: number) => {
    if (wrapperWidth > contentWidth) {
      // 容器宽度大于内容宽度，滚动至开头
      translateX.value = 0;
    } else if (-translateX.value > contentWidth - wrapperWidth) {
      translateX.value = wrapperWidth - contentWidth;
    } else if (translateX.value > 0) {
      translateX.value = 0;
    }
  },
  200
);

// 滚动至指定位置
function handleScroll(x: number, width: number) {
  const wrapperWidth = wrapper.value!.offsetWidth;
  const contentWidth = content.value!.offsetWidth;
  if (contentWidth <= wrapperWidth) return;

  // 当 x 小于可视范围的最小值时
  if (x < -translateX.value + 150) {
    translateX.value = -(x - 150);
    resetTranslateX(wrapperWidth, contentWidth);
  }

  // 当 x 大于可视范围的最大值时
  if (x + width > -translateX.value + wrapperWidth) {
    translateX.value = wrapperWidth - (x + width);
    resetTranslateX(wrapperWidth, contentWidth);
  }
}

defineExpose({
  handleScroll,
});

const refreshIsOverflow = debounce(() => {
  const wrapperWidth = wrapper.value!.offsetWidth;
  const contentWidth = content.value!.offsetWidth;
  resetTranslateX(wrapperWidth, contentWidth);
}, 200);

onMounted(() => {
  refreshIsOverflow();
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;

  z-index: 9;
  overflow: hidden;
  position: relative;
  .content {
    padding-left: 10px;
    padding-right: 30px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    transition: transform 0.5s;
  }
  .left,
  .right {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;

    width: 20px;
    height: 35px;

    font-size: 18px;
    border-radius: 2px;

    z-index: 2;
    cursor: pointer;
  }
}
</style>
