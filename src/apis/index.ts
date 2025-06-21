import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../stores/auth";

import type * as Types from "@/types";

// 定义请求配置扩展类型
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipAuth?: boolean; // 是否跳过认证
  skipErrorHandler?: boolean; // 是否跳过错误处理
}

// 创建 axios 实例
const apiClient: AxiosInstance = axios.create({
  baseURL: "https://open-api.123pan.com", // 可以在这里配置你的API基础URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Platform: "open_platform",
  },
});

// 获取认证 store 实例的函数
const getAuthStore = () => {
  try {
    return useAuthStore();
  } catch (error) {
    // 如果在组件外部调用，可能会失败，这时返回 null
    console.warn("无法获取 auth store，可能在组件外部调用");
    return null;
  }
};

// 请求拦截器
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const customConfig = config as CustomAxiosRequestConfig;
    console.log(`发起请求: ${config.method?.toUpperCase()} ${config.url}`);

    // 添加认证token（如果不跳过认证）
    if (!customConfig.skipAuth) {
      const authStore = getAuthStore();
      const token = authStore?.accessToken || localStorage.getItem("accessToken");

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // 添加请求时间戳
    config.headers = config.headers || {};
    config.headers["X-Timestamp"] = Date.now().toString();

    // 可以在这里添加loading状态
    // const authStore = getAuthStore();
    // if (authStore) authStore.isLoading = true;

    return config;
  },
  (error: AxiosError) => {
    console.error("请求错误:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse<Types.ApiResponse>) => {
    console.log(`响应成功: ${response.config.method?.toUpperCase()} ${response.config.url}`);

    // 关闭loading状态
    // const authStore = getAuthStore();
    // if (authStore) authStore.isLoading = false;

    const { data } = response;

    // 检查业务状态码
    if (data.code === 0 || data.code === 200) {
      return response;
    } else {
      // 业务错误处理
      const error = new Error(data.message || "请求失败") as any;
      error.code = data.code;
      error.response = response;
      return Promise.reject(error);
    }
  },
  (error: AxiosError<Types.ApiResponse>) => {
    console.error("响应错误:", error);

    // 关闭loading状态
    // const authStore = getAuthStore();
    // if (authStore) authStore.isLoading = false;

    const { response, config } = error;
    const customConfig = config as CustomAxiosRequestConfig;

    // 如果跳过错误处理，直接抛出错误
    if (customConfig?.skipErrorHandler) {
      return Promise.reject(error);
    }

    if (response) {
      const { status, data } = response;

      switch (status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          // window.location.href = '/login';
          break;

        case 403:
          // 禁止访问
          console.error("没有权限访问该资源");
          break;

        case 404:
          console.error("请求的资源不存在");
          break;

        case 422:
          // 表单验证错误
          console.error("请求参数验证失败:", data?.message);
          break;

        case 500:
          console.error("服务器内部错误");
          break;

        default:
          console.error(`请求失败: ${status} - ${data?.message || error.message}`);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("请求超时");
    } else if (error.message === "Network Error") {
      console.error("网络连接失败");
    } else {
      console.error("请求失败:", error.message);
    }

    return Promise.reject(error);
  }
);


// 请求配置接口（用于外部使用）
interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  skipErrorHandler?: boolean;
}

// 导出封装的请求方法
export const request = {
  get: <T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<Types.ApiResponse<T>>> => apiClient.get(url, config),

  post: <T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<Types.ApiResponse<T>>> =>
    apiClient.post(url, data, config),

  put: <T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<Types.ApiResponse<T>>> =>
    apiClient.put(url, data, config),

  delete: <T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<Types.ApiResponse<T>>> => apiClient.delete(url, config),

  patch: <T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<Types.ApiResponse<T>>> =>
    apiClient.patch(url, data, config),
};

// 导出 axios 实例（供特殊需求使用）
export default apiClient;

// 使用示例：
/*
// 基本使用
const fetchUserList = async () => {
  try {
    const response = await request.get<User[]>('/users');
    return response.data.data;
  } catch (error) {
    console.error('获取用户列表失败:', error);
    throw error;
  }
};

// 跳过认证的请求
const publicRequest = async () => {
  try {
    const response = await request.get('/public/info', { skipAuth: true });
    return response.data.data;
  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
};

// 跳过错误处理的请求
const customErrorHandling = async () => {
  try {
    const response = await request.get('/users', { skipErrorHandler: true });
    return response.data.data;
  } catch (error) {
    // 自定义错误处理逻辑
    console.error('自定义错误处理:', error);
    throw error;
  }
};

// 使用 Pinia store 进行登录
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// 登录
await authStore.login({ username: 'user', password: 'password' });

// 登出
await authStore.logout();

// 检查认证状态
if (authStore.isAuthenticated) {
  console.log('用户已登录:', authStore.userInfo);
}
*/
