import { request } from "@/utils";

export default {
  getTeaching: () => request.get("/home/teaching"),
  getStatistics: () => request.get("/statistic/index"),
};
