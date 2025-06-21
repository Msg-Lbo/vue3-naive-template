import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { loginAPi } from "../apis/apis";

// 用户信息接口
export interface UserInfo {
  id: string | number;
  username: string;
  email?: string;
  avatar?: string;
  roles?: string[];
  [key: string]: any;
}

// 认证 Store
export const useAuthStore = defineStore("auth", () => {
  // 状态
  const accessToken = ref<string | null>(localStorage.getItem("accessToken"));
  const refreshToken = ref<string | null>(localStorage.getItem("refreshToken"));
  const userInfo = ref<UserInfo | null>(null);
  const isLoading = ref(false);

  // 计算属性
  const isAuthenticated = computed(() => !!accessToken.value);
  const hasRole = computed(() => (role: string) => {
    return userInfo.value?.roles?.includes(role) ?? false;
  });

  // 方法
  const setTokens = (access: string, refresh?: string) => {
    accessToken.value = access;
    localStorage.setItem("accessToken", access);

    if (refresh) {
      refreshToken.value = refresh;
      localStorage.setItem("refreshToken", refresh);
    }
  };

  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info;
  };

  const clearAuth = () => {
    accessToken.value = null;
    refreshToken.value = null;
    userInfo.value = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
  };

  const login = async (credentials: { clientID: string; clientSecret: string }) => {
    try {
      isLoading.value = true;
      // 调用实际的登录 API
      const response = await loginAPi(credentials);
      console.log(response);
      
      const accessToken = response.data.accessToken;
      if (accessToken) {
        setTokens(accessToken);
      }
      
      return response;
    } catch (error) {
      console.error("登录失败:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const checkAuth = () => {
    // 检查本地存储的用户信息
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo && accessToken.value) {
      try {
        userInfo.value = JSON.parse(savedUserInfo);
      } catch (error) {
        console.error("解析用户信息失败:", error);
        clearAuth();
      }
    } else if (!accessToken.value) {
      clearAuth();
    }
  };

  // 初始化时检查认证状态
  checkAuth();

  return {
    // 状态
    accessToken,
    refreshToken,
    userInfo,
    isLoading,
    
    // 计算属性
    isAuthenticated,
    hasRole,
    
    // 方法
    setTokens,
    setUserInfo,
    clearAuth,
    login,
    checkAuth,
  };
});

// 导出类型
export type AuthStore = ReturnType<typeof useAuthStore>;
