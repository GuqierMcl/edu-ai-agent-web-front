import { createStorage } from "./storage";

const prefixKey = "practical_training_server";

export const createLocalStorage = function (prefixKey: string) {
  return createStorage({
    prefixKey: prefixKey || "",
    storage: localStorage,
  });
};

export const createSessionStorage = function (prefixKey: string) {
  return createStorage({
    prefixKey: prefixKey || "",
    storage: sessionStorage,
  });
};

export const lStorage = createLocalStorage(prefixKey);

export const sStorage = createSessionStorage(prefixKey);
