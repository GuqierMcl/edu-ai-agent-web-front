import optionsApi from "@/api/optionsApi";

export const getCascaderRoot = async () => {
  const { code, data } = await optionsApi.getColleges();
  if (code !== 1) return [];
  return [
    {
      label: "全部",
      value: "",
      depth: 1,
      isLeaf: false,
    },
    ...data.map((item) => {
      return {
        label: item.name,
        value: item.id,
        depth: 1,
        isLeaf: false,
      };
    }),
  ];
};

export const getMajorOptions = async (collId: string) => {
  if (collId == "") return [];
  const { code, data } = await optionsApi.getMajors(collId);
  if (code !== 1) return [];
  return data.map((item) => {
    return {
      label: item.name,
      value: item.id,
      depth: 2,
      isLeaf: false,
    };
  });
};

export const getClazzOptions = async (majorId: string) => {
  const { code, data } = await optionsApi.getClazzs(majorId);
  if (code !== 1) return [];
  return data.map((item) => {
    return {
      label: item.name,
      value: item.id,
      depth: 3,
      isLeaf: true,
    };
  });
};
