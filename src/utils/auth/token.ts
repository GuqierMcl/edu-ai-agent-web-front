import permissionApi from "@/api/authApi";
import { lStorage } from "@/utils";
import { useUserStore } from "@/store";

const TOKEN_CODE = "access_token";
const DURATION = 12 * 60 * 60;

export function getToken() {
  return lStorage.get(TOKEN_CODE);
}

export function setToken(token: string) {
  lStorage.set(TOKEN_CODE, token, DURATION);
}

export function removeToken() {
  lStorage.remove(TOKEN_CODE);
}

export async function refreshAccessToken() {
  const tokenItem = lStorage.getItem(TOKEN_CODE);
  if (!tokenItem) {
    return;
  }
  const { time } = tokenItem;

  // token生成时间到失效期的前半段时间内不执行刷新
  if (new Date().getTime() - time <= 1000 * DURATION / 2) return;

  const { code, data } = await permissionApi.refreshToken();
  if (code === 1) {
    setToken(data.token);
  } else {
    // 刷新失败重新登录
    useUserStore().logoutOnlyRedirect();
  }
}
