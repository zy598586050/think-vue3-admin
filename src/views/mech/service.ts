import request from "@/utils/request";

// 获取部门列表
export const getMechList = (data: any = {}) => {
  return request({
    url: "mech_list",
    method: "POST",
    data,
  });
};

// 新增/编辑部门
export const createOrEditMech = (data: any) => {
  return request({
    url: "mech_create_or_edit",
    method: "POST",
    data,
  });
};

// 删除部门
export const deleteMech = (data: any) => {
  return request({
    url: "mech_delete",
    method: "POST",
    data,
  });
};
