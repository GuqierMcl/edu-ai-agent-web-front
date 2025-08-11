<template>
  <div>
    <div class="w-full">
      <div class="header w-full">
        <ContextHeader
          :search="false"
          :remove="false"
          @add="showModal = true"
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
      title="添加组织"
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
import { onMounted, ref } from "vue";
import Form from "./Form.vue";
import FormAdd from "./FormAdd.vue";
import organizationApi from "@/api/organizationApi";

const treeData = ref<MyTreeOption[]>([]);
const nowNode = ref(<MyTreeOption>{});
const showModal = ref<boolean>(false);
const expandedKeys = ref<string[]>([]); // 已展开的节点，不再加载

const handleLoad = (node: MyTreeOption) => {
  node.isLeaf = false;
  return new Promise<void>(async (resolve) => {
    const { code, data } = await organizationApi.getByParentId(node.data.id);
    if (code !== 1) return;
    if (data.length == 0) {
      // 当前节点没有子节点，则设置为叶子节点
      node.isLeaf = true;
    }

    node.children = data.map((item) => {
      return {
        label: item.name,
        key: item.id,
        isLeaf: false,
        data: item,
        parent: node,
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
    },
  };
};

// 更新树节点数据
const refreshNode = (node: Organization) => {
  Object.assign(nowNode.value, {
    label: node.name,
    type: node.type,
  });
  nowNode.value.data = node;
};

// 加载根节点
const loadRoot = async () => {
  const { code, data } = await organizationApi.getByParentId();
  if (code !== 1 || data.length === 0) return;

  treeData.value = data.map((item) => {
    return {
      label: item.name,
      key: item.id,
      isLeaf: false,
      data: item,
    };
  });
  nowNode.value = treeData.value[0];
};

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

onMounted(() => {
  loadRoot();
});
</script>

<style lang="scss" scoped></style>
