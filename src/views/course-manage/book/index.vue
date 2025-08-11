<template>
  <div>
    <div class="w-full">
      <div class="header w-full">
        <ContextHeader
          back
          :search="false"
          @add="showAddForm"
          :remove="false"
        ></ContextHeader>
      </div>

      <n-layout has-sider style="height: calc((100vh - 280px))">
        <n-layout-sider
          class="h-full"
          bordered
          content-style="padding: 10px;"
          :native-scrollbar="false"
        >
          <n-tree
            block-line
            expand-on-click
            :data="treeData"
            :node-props="nodeProps"
            :on-load="handleLoad"
            :on-update:expanded-keys="(keys: string[]) => {
            expandedKeys = keys;
          }"
          />
        </n-layout-sider>
        <n-scrollbar style="max-height: 900px">
          <div class="full flex justify-center mt-20">
            <div class="w-500">
              <Form
                :deep="nowNodeDeep"
                :formData="nowNode.data"
                @refreshNode="refreshNode"
                @removeNowNode="removeNowNode"
              ></Form>
            </div>
          </div>
        </n-scrollbar>
      </n-layout>
    </div>

    <n-modal
      class="w-520 p-10"
      title="添加节点"
      v-model:show="showModal"
      preset="card"
      size="huge"
    >
      <FormAdd
        :parent="nowNode.data"
        @close="showModal = false"
        @refreshNode="handleLoad(nowNode)"
      ></FormAdd>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { h, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import bookApi from "@/api/bookApi";
import Form from "./Form.vue";
import FormAdd from "./FormAdd.vue";

const route = useRoute();

const treeData = ref<MyTreeOption[]>([]);
const showModal = ref(false);
const nowNode = ref(<MyTreeOption>{}); // 当前选择的节点
const nowNodeDeep = ref(1); // 当前选择的节点的深度
const expandedKeys = ref<string[]>([]); // 已展开的节点，不再加载

// 从树结构中删除当前节点
const removeNowNode = () => {
  const parentNode = nowNode.value.parent!;
  parentNode!.children = parentNode.children!.filter((item) => {
    return item.key != nowNode.value.key;
  });
  // 若删除后 父节点的子节点数为0，则将父节点设置为叶子节点
  if (parentNode.children.length == 0) {
    parentNode.isLeaf = true;
  }
};

// 更新树节点数据
const refreshNode = (node: Book) => {
  Object.assign(nowNode.value, {
    label: node.name,
    type: node.type,
  });
  nowNode.value.data = node;
};

const showAddForm = () => {
  if (nowNode.value.data) showModal.value = true;
  else window.$message.error("请选择节点再进行添加");
};

const handleLoad = (node: MyTreeOption) => {
  node.isLeaf = false;
  return new Promise<void>(async (resolve) => {
    const { code, data } = await bookApi.getNode(<string>node.key);
    if (code !== 1) return;
    if (data.length === 0) {
      // 设置为叶子节点
      node.isLeaf = true;
    }
    node.children = data.map((item) => {
      return {
        label: item.name,
        key: item.id,
        isLeaf: false,
        deep: <number>node.deep + 1,
        data: item,
        parent: node,
        suffix: () =>
          h("span", { class: "text-12 color-gray" }, "题目数：" + item.itemNum),
      };
    });
    resolve();
  });
};

// 设置节点的点击事件
const nodeProps = ({ option }: { option: MyTreeOption }) => {
  return {
    onClick() {
      nowNode.value = option;
      nowNodeDeep.value = option.deep as number;
    },
  };
};

const init = () => {
  // 设置根节点
  treeData.value = [
    {
      label: route.params.name as string,
      key: route.params.id as string,
      isLeaf: false,
      deep: 1,
      data: route.params,
      suffix: () =>
        h(
          "span",
          { class: "text-12 color-gray" },
          "题目数：" + route.params.itemNum
        ),
    },
  ];
  nowNode.value = treeData.value[0];
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped></style>
