import { defineStore } from "pinia";
import { router } from "@/router";

const WITHOUT_TAG_PATHS = ["404", "Login"];

export const useTagsStore = defineStore("tag", {
  state() {
    return {
      tags: <Page.Tag[]>[],
      activeTagName: "",
    };
  },
  getters: {
    activeIndex(): number {
      return this.tags.findIndex(
        (item) => item.routeName === this.activeTagName
      );
    },
  },
  actions: {
    setActiveTag(name: string) {
      this.activeTagName = name;
    },
    setTags(tags: Page.Tag[]) {
      this.tags = tags;
    },
    addTag(tag: Page.Tag) {
      this.setActiveTag(tag.routeName);
      // 若是404或登录页，或者已有标签，则不设置标签
      if (
        WITHOUT_TAG_PATHS.includes(tag.routeName) ||
        this.tags.some((item) => item.routeName === tag.routeName)
      )
        return;
      this.setTags([...this.tags, tag]);
    },
    removeTag(name: string) {
      // 若关闭的是当前页，则跳转至其他页
      if (name === this.activeTagName) {
        if (this.activeIndex === 0) {
          // 若是第一个标签页，则跳转至下一个标签页
          router.push({ name: this.tags[this.activeIndex + 1].routeName });
        } else {
          // 否则跳转至上一个
          router.push({ name: this.tags[this.activeIndex - 1].routeName });
        }
      }
      this.setTags(this.tags.filter((tag) => tag.routeName !== name));
    },
    removeOther(curName: string) {
      this.setTags(this.tags.filter((tag) => tag.routeName === curName));
      // 若右击的不是当前页，则跳转至右击页
      if (curName !== this.activeTagName) {
        router.push({ name: curName });
      }
    },
    removeLeft(curName: string) {
      const curIndex = this.tags.findIndex(
        (item) => item.routeName === curName
      );
      // 过滤并存储右边的标签
      const filterTags = this.tags.filter((item, index) => index >= curIndex);
      this.setTags(filterTags);
      // 若当前页在左边，则跳转至剩余标签的第一个
      if (!filterTags.find((item) => item.routeName === this.activeTagName)) {
        router.push({ name: filterTags[0].routeName });
      }
    },
    removeRight(curName: string) {
      const curIndex = this.tags.findIndex(
        (item) => item.routeName === curName
      );
      // 过滤并存储左边的标签
      const filterTags = this.tags.filter((item, index) => index <= curIndex);
      this.setTags(filterTags);
      // 若当前页在左边，则跳转至剩余标签的第一个
      if (!filterTags.find((item) => item.routeName === this.activeTagName)) {
        router.push({ name: filterTags[0].routeName });
      }
    },
    resetTags() {
      this.setTags([]);
      this.setActiveTag("");
    },
  },
});
