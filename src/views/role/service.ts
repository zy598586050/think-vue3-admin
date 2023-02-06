import request from "@/utils/request";

// 获取角色列表
export const getRoleList = (data: any = {}) => {
  return request({
    url: "role_list",
    method: "POST",
    data,
  });
};

// 新增/编辑角色
export const createOrEditRole = (data: any) => {
  return request({
    url: "role_create_or_edit",
    method: "POST",
    data,
  });
};

// 删除角色
export const deleteRole = (data: any) => {
  return request({
    url: "role_delete",
    method: "POST",
    data,
  });
};
