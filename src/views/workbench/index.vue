<template>
    <div class="full">
        <div class="flex-1">
            <n-card class="rounded-10">
                <div class="flex items-center">
                    <n-avatar
                        :bordered="true"
                        round
                        :src="
                            userStore.userInfo.avatar_url?.length
                                ? userStore.userInfo.avatar_url
                                : DefaultAvatar
                        "
                        :size="60"
                        :fallback-src="DefaultAvatar"
                    />
                    <div class="ml-20">
                        <p class="text-16">{{ `${greeting}好，${userStore.nickname}！` }}</p>
                        <p class="mt-5 text-12 op-60">今天又是元气满满的一天</p>
                    </div>
                </div>
            </n-card>

            <div class="statistic f-b-c mt-20 mb-30">
                <div class="f-c-c flex-col">
                    <div
                        style="
                            background: linear-gradient(
                                143.5deg,
                                rgb(9, 184, 241) 7.252%,
                                rgb(46, 156, 223) 62.197%,
                                rgb(54, 140, 226) 94.687%
                            );
                        "
                        class="f-c-c item"
                    >
                        <div class="font">{{ statistics.stuNum }}</div>
                    </div>
                    <div class="fontb">注册学生数</div>
                </div>
                <div class="f-c-c flex-col">
                    <div
                        style="
                            background: linear-gradient(
                                142.77deg,
                                rgb(242, 195, 91) 3.932%,
                                rgb(235, 143, 103) 46.405%,
                                rgb(231, 108, 129) 93.674%
                            );
                        "
                        class="f-c-c item"
                    >
                        <div class="font">{{ statistics.testPaperNum }}</div>
                    </div>
                    <div class="fontb">试卷数</div>
                </div>
                <div class="f-c-c flex-col">
                    <div
                        style="
                            background: linear-gradient(
                                138.33deg,
                                rgb(221, 195, 93) 6.156%,
                                rgba(132, 197, 178, 0.99) 58.355%,
                                rgb(121, 202, 203) 100%
                            );
                        "
                        class="f-c-c item"
                    >
                        <div class="font">{{ learningTime }}</div>
                    </div>
                    <div class="fontb">平均学习时间</div>
                </div>
                <div class="f-c-c flex-col">
                    <div
                        style="
                            background: linear-gradient(
                                143.5deg,
                                rgb(9, 184, 241) 7.252%,
                                rgb(46, 156, 223) 62.197%,
                                rgb(54, 140, 226) 94.687%
                            );
                        "
                        class="f-c-c item"
                    >
                        <div class="font">{{ statistics.topicNum }}</div>
                    </div>
                    <div class="fontb">题目数</div>
                </div>
                <div class="f-c-c flex-col">
                    <div
                        style="
                            background: linear-gradient(
                                142.77deg,
                                rgb(242, 195, 91) 3.932%,
                                rgb(235, 143, 103) 46.405%,
                                rgb(231, 108, 129) 93.674%
                            );
                        "
                        class="f-c-c item"
                    >
                        <div class="font">{{ statistics.averageScore }}</div>
                    </div>
                    <div class="fontb">平均积分</div>
                </div>
            </div>

            <!-- <n-row>
        <n-col span="12">
          <div>
            <div style="font-size: 18px; font-weight: 550">积分排行榜TOP10</div>
            <myEcharts :width="'600px'" :height="'400px'"></myEcharts>
          </div>
        </n-col>

        <n-col span="11" offset="1">
          <div>
            <div style="font-size: 18px; font-weight: 550">教学任务</div>
            <div class="h-400 p-20" style="overflow-y: scroll">
              <div class="mt-10" v-for="item in teachingList" :key="item.id">
                <div class="f-c-c mb-10">{{ item.name }}</div>
                <div class="flex flex-wrap justify-between">
                  <div
                    v-for="item2 in item.courses"
                    :key="item2.id"
                    class="mb-10 mt-10 w-200 flex-shrink-0 cursor-pointer bg-#f5f5f5 dark:bg-#333 p-20 b-rd-10"
                  >
                    <div
                      class="f-c-c"
                      style="font-size: 14px; font-weight: 600"
                    >
                      {{ item2.name }}
                    </div>
                    <p v-for="item3 in item2.clazzs" :key="item3.id" op-60>
                      {{ item3.name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </n-col>
      </n-row> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store";
import workbenchApi from "@/api/workbenchApi";
import { onMounted, ref, computed } from "vue";
import DefaultAvatar from "@/assets/images/defaultAvatar.png";
import { useTimeGreeting } from '@/hooks/useTimeGreeting';

const greeting = useTimeGreeting();

const teachingList = ref<any>([]);
const statistics = ref(<Statistic>{
    stuNum: "0",
    testPaperNum: "0",
    topicNum: "0",
    averageLearningTime: "0",
    averageScore: "0",
});
const getTeaching = async () => {
    const { data } = await workbenchApi.getTeaching();
    teachingList.value = data;
};
const getStatistics = async () => {
    const { data } = await workbenchApi.getStatistics();
    statistics.value = data;
};
const userStore = useUserStore();

const learningTime = computed(() => {
    let time = Number(statistics.value.averageLearningTime);
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}`;
});

onMounted(() => {
    // getTeaching();
    // getStatistics();
});
</script>

<style scoped lang="scss">
.light-green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.12);
}
.green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.24);
}
.item {
    width: 200px;
    height: 150px;
    border-radius: 10%;
    .font {
        font-size: 40px;
        font-weight: bolder;
        color: white;
    }
}

.fontb {
    margin-top: 10px;
    font-size: 20px;
    font-weight: 550;
}
</style>
