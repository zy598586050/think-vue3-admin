const env: string = import.meta.env.MODE || "production";
interface UrlType {
  baseUrl: string;
  mockUrl: string;
}
interface EnvConfigType {
  development: UrlType;
  test: UrlType;
  production: UrlType;
}
const EnvConfig: EnvConfigType = {
  // 开发环境
  development: {
    baseUrl: "/api/v1",
    mockUrl: "",
  },
  // 测试环境
  test: {
    baseUrl: "/api/v1",
    mockUrl: "",
  },
  // 生产环境
  production: {
    baseUrl: "/api/v1",
    mockUrl: "",
  },
};
export default {
  env,
  mock: false,
  ...EnvConfig[env as keyof typeof EnvConfig],
  namespace: "ThinkVue3Admin",
};
