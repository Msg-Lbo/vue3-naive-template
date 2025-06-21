import request from ".";
import type * as ApiTypes from "@/types";

// 登陆
const loginAPi = async (loginInfo: ApiTypes.LoginParams): Promise<ApiTypes.ApiResponse> => {
  const res = await request.post("/api/v1/access_token", loginInfo);
  return res.data;
};

// 导出 API 函数
export { loginAPi };
