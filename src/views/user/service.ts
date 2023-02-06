import request from "@/utils/request";

// 获取用户菜单和权限列表
export const getMenuAuth = () => {
  return request({
    url: "get_menu_auth",
    method: "POST",
    data: {},
  });
};

// 根据部门查用户列表
export const getUserByMech = (data: any) => {
  return request({
    url: "get_user_by_mech",
    method: "POST",
    data,
  });
};

// 新增或编辑用户
export const createOrEditUser = (data: any) => {
  return request({
    url: "user_create_or_edit",
    method: "POST",
    data,
  });
};

// 删除用户
export const deleteUser = (data: any) => {
  return request({
    url: "user_delete",
    method: "POST",
    data,
  });
};
