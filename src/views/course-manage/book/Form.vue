<template>
  <transition
    mode="out-in"
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div v-show="isDef(formData.parentId)">
      <n-form
        ref="formRef"
        :model="useData"
        :rules="formRules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="节点名" path="name">
          <n-input
            v-model:value="useData.name"
            placeholder="请输入节点名称"
            @input="onChange"
          />
        </n-form-item>
        <n-form-item label="序号" path="sequence">
          <n-input
            v-model:value="useData.sequence"
            placeholder="默认排序为1"
            @input="onChange"
          />
        </n-form-item>
        <n-form-item label="层级" path="grade">
          <n-input
            v-model:value="useData.grade"
            :disabled="true"
            placeholder="none"
          />
        </n-form-item>
        <n-form-item v-show="deep == 2" label="封面">
          <n-upload
            ref="uploadRef"
            :default-upload="false"
            list-type="image"
            accept="image/*"
            :show-file-list="false"
            :max="1"
            @before-upload="uploadCover"
          >
            <n-avatar
              :bordered="true"
              alt="上传封面"
              :size="150"
              :src="useData.imageUrl"
            />
            <!-- :fallback-src="DefaultAvatar" -->
          </n-upload>
        </n-form-item>
      </n-form>
      <div class="h-100 flex justify-end">
        <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <div v-show="showOptions" class="flex justify-end">
            <n-button @click="cancel">取消</n-button>
            <n-button ml-20 type="primary" @click="save">更新</n-button>
          </div>
        </transition>
        <n-button ml-20 type="error" @click="remove">删除</n-button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type { FormInst, UploadFileInfo } from "naive-ui";
import bookApi from "@/api/bookApi";
import { formRules } from "./common";
import { isDef } from "@/utils";

const emits = defineEmits(["refreshNode", "removeNowNode"]);
const props = defineProps({
  formData: {
    type: Object as () => Book,
    require: false,
    default: {
      id: "",
      parentId: "",
      name: "",
      grade: "",
      type: "",
      sequence: "",
    },
  },
  deep: {
    type: Number,
    require: false,
  },
});
const formRef = ref<FormInst>();
const uploadRef = ref();
const showOptions = ref(false);
const useData = ref(<Book>{});
  
watch(
  () => props.formData,
  (newV) => {
    // 深拷贝
    useData.value = JSON.parse(JSON.stringify(newV));
  },
  { immediate: true }
);

const onChange = () => {
  showOptions.value = true;
};

const cancel = () => {
  useData.value = JSON.parse(JSON.stringify(props.formData));
  showOptions.value = false;
};

const uploadCover = async ({ file }: { file: UploadFileInfo }) => {
  // 上传封面
  const coverData = new FormData();
  coverData.append("bookId", useData.value.id);
  coverData.append("file", file.file!);
  const { code, data } = await bookApi.uploadCover(coverData);
  if (code !== 1) return;
  window.$message.success("上传封面成功");
  uploadRef.value.clear();
  useData.value.imageUrl = data.imageUrl;
  emits("refreshNode", useData.value);
};

const save = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      // 上传基本信息
      const commRes = await bookApi.updateNode(useData.value);
      if (commRes.code !== 1) return;
      window.$message.success("更新成功");
      emits("refreshNode", useData.value);
      showOptions.value = false;
    } else {
      window.$message.error("请完善信息");
    }
  });
};

const remove = () => {
  window.$dialog.warning({
    title: "警告",
    content: `确定删除节点 【${useData.value.name}】 的信息吗？相关书籍、题目也会一同删除`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const { code } = await bookApi.delNode(<string>useData.value.id);
      if (code === 1) {
        window.$message.success("删除成功");
        emits("removeNowNode", useData.value);
      }
    },
  });
};
</script>

<style lang="scss" scoped></style>
