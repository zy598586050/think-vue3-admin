import request from "@/utils/request";

// 获取权限列表
export const getAuthList = () => {
  return request({
    url: "auth_list",
    method: "POST",
    data: {},
  });
};

// 新增/编辑权限
export const createOrEditAuth = (data: any) => {
  return request({
    url: "auth_create_or_edit",
    method: "POST",
    data,
  });
};

// 删除权限
export const deleteAuth = (data: any) => {
  return request({
    url: "auth_delete",
    method: "POST",
    data,
  });
};
