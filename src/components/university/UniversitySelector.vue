<template>
    <div>
        <n-select
            v-model:value="model"
            :options="options"
            placeholder="请选择学校"
            filterable
            :loading="loading"
            @search="refreshOptions"
            :remote="true"
            :status="model != '' ? 'success' : 'error'"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineModel, defineProps } from "vue";
import universityApi from "@/api/universityApi";
import { SelectOption } from "naive-ui";

const loading = ref(false);
const options = ref(<SelectOption[]>[]);
const showMenu = ref(false);
const model = defineModel();

const props = defineProps({
    university: {
        type: Object as () => University,
        require: false,
        default: {},
    },
});

const refreshOptions = async (query: string) => {
    if (query === "") return;
    loading.value = true;
    const { code, data } = await universityApi.search(query);
    if (code === 1) {
        options.value = data.map((item) => {
            return {
                label: item.school_name,
                value: item.id,
            };
        });
        showMenu.value = true;
    }
    loading.value = false;
};
const init = async () => {
    if(!props.university) return
    options.value = [
        {
            label: props.university.school_name,
            value: props.university.id,
        },
    ];
};
onMounted(async () => {
    init();
});
</script>

<style scoped></style>
