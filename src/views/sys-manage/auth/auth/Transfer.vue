<template>
  <n-transfer
    class="mb-20"
    ref="transfer"
    v-model:value="roles"
    source-title="全部角色"
    :target-title="formData.name"
    :options="options"
  >
  </n-transfer>
  <div class="w-full flex justify-end">
    <n-button @click="emits('close')">取消</n-button>
    <n-button ml-20 type="primary" @click="save">保存</n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import authApi from "@/api/authApi";

const props = defineProps({
  isEdit: {
    type: Boolean,
    require: true,
  },
  formData: {
    type: Object as () => RoleTeacher,
    require: false,
    default: {},
  },
  options: {
    type: Object as () => Role[],
    require: false,
    default: {},
  },
});

const emits = defineEmits(["close", "reloadList"]);
let roles = ref<string[]>([]);

props.formData.roles?.forEach((item) => {
  roles.value.push(item.id);
});

const save = async () => {
  let resCode: number;
  if (props.isEdit) {
    const editAuthQueryInfo = {
      teacherId: <string>props.formData.id,
      roleIds: roles.value,
    };
    const { code } = await authApi.editTeacherAuth(editAuthQueryInfo);
    resCode = code;
    if (resCode === 1) {
      window.$message.success("保存成功");
      emits("reloadList");
      emits("close");
    }
  } else {
    window.$message.error("请完善信息");
  }
};
</script>

<style lang="scss" scoped></style>
