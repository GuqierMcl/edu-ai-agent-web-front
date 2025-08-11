<template>
  <div class="echarts-box">
    <div
      id="myEcharts"
      :style="{ width: props.width, height: props.height }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import echarts from "./common";
import { onMounted, onUnmounted, ref } from "vue";
import studentApi from "@/api/studentApi";

const scoreArr = ref<string[]>([]);
const studentArr = ref<string[]>([]);

const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {},
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0.01],
  },
  yAxis: {
    type: "category",
    data: studentArr.value,
  },
  series: [
    {
      type: "bar",
      data: scoreArr.value,
      itemStyle: {
        color: function (params: any) {
          if (params.dataIndex == 9) {
            return "rgb(238,102,102)";
          } else if (params.dataIndex == 8) {
            return "rgb(159,224,128)";
          } else if (params.dataIndex == 7) {
            return "rgb(115,192,222)";
          }
          return "rgb(116, 142, 222)";
        },
      },
      label: {
        show: true,
        position: "inside",
        formatter: "{c}",
      },
    },
  ],
};

const queryParams = ref({
  page: 1,
  pageSize: 10,
  collegeId: "",
  majorId: "",
  clazzId: "",
  name: "",
  gradeId: "",
  account: "",
});

const getTop10 = async () => {
  const { code, data } = await studentApi.getScoreList(queryParams.value);
  if (code !== 1) return;
  data.records.forEach((item: any) => {
    scoreArr.value.unshift(item.score);
    studentArr.value.unshift(item.name);
  });
};

const props = defineProps({
  width: {
    type: String,
    require: true,
  },
  height: {
    type: String,
    require: true,
  },
});
let myEcharts = echarts;

function initChart() {
  let chart = myEcharts.init(document.getElementById("myEcharts"), null, {
    renderer: "svg",
  });
  chart.setOption(option);
  window.onresize = function () {
    chart.resize();
  };
}

onMounted(async () => {
  // await getTop10();
  initChart();
});

onUnmounted(() => {
  myEcharts.dispose;
});
</script>
