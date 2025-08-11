<template>
  <n-transfer
    class="mb-20"
    ref="transfer"
    v-model:value="permissions"
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
import permissionApi from "@/api/permissionApi";

const props = defineProps({
  isEdit: {
    type: Boolean,
    require: true,
  },
  formData: {
    type: Object as () => PermissionList,
    require: false,
    default: {},
  },
  options: {
    type: Object as () => Permission[],
    require: false,
    default: {},
  },
});

const emits = defineEmits(["close", "reloadList"]);

let permissions = ref<string[]>([]);
const getRolePermissionList = async () => {
  const { data } = await permissionApi.getRolePermissionList(
    <string>props.formData.id
  );
  data.forEach((item) => {
    permissions.value.push(<string>item.id);
  });
};

const save = async () => {
  let resCode: number;
  if (props.isEdit) {
    const editRoleQueryInfo = {
      roleId: <string>props.formData.id,
      permissionIds: permissions.value,
    };
    const { code } = await permissionApi.update(editRoleQueryInfo);
    resCode = code;
    if (resCode === 1) {
      window.$message.success("保存成功");
      emits("reloadList");
      emits("close");
    }
  }
};

defineExpose({
  getRolePermissionList,
});
</script>

<style lang="scss" scoped></style>
