<template>
  <!-- 搜索 -->
  <button-search placeholder="要搜索的角色" @search="searchEvent">
    <!-- 左边 -->
    <template #left>
      <el-button
        v-has="'sys:role:add'"
        type="primary"
        size="mini"
        @click="openWindow"
        >添加角色</el-button
      >
    </template>
  </button-search>
  <!-- 表格 -->
  <el-table class="mt-5" :data="tableData" border>
    <el-table-column prop="name" label="角色名称" align="center" />
    <el-table-column prop="remarks" label="角色备注" align="center" />
    <el-table-column label="操作" width="200" align="center">
      <template #default="scope">
        <el-button
          v-has="'sys:role:edit'"
          type="primary"
          size="mini"
          @click="openWindow(scope.row)"
          >编辑</el-button
        >
        <el-button
          v-has="'sys:role:del'"
          type="danger"
          size="mini"
          @click="handleDelete(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加、编辑弹窗 -->
  <el-dialog
    v-model="isShowModel"
    :title="submitForm.id ? '编辑' : '新增'"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="submitForm">
      <el-form-item label="角色名称">
        <el-input
          v-model="submitForm.name"
          placeholder="请输入角色名称"
          class="w-[190px]"
        />
      </el-form-item>
      <el-form-item label="角色备注">
        <el-input
          v-model="submitForm.remarks"
          placeholder="请输入角色备注"
          class="w-[190px]"
        />
      </el-form-item>
    </el-form>
    <div v-has="'sys:role:dist'" class="menu-box">
      <div class="menu-box-label">权限列表</div>
      <div class="menu-box-tree">
        <el-tree
          ref="tree"
          :props="{ label: 'name', children: 'children' }"
          :data="authTree"
          node-key="id"
          show-checkbox
          default-expand-all
        ></el-tree>
      </div>
    </div>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitButton">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import buttonSearch from "@/components/ButtonSearch/index.vue";
import { getAuthList } from "../auth/service";
import { deleteRole, createOrEditRole, getRoleList } from "./service";

const tree = ref();
const authTree = ref([]);
const tableData = ref([]);
const searchForm = reactive({
  name: "",
});
let submitForm = reactive({
  id: "",
  name: "",
  remarks: "",
  auth_ids: "",
});
const isShowModel = ref(false);

// 获取权限列表
getAuthList().then((result: any) => {
  authTree.value = result.data;
});

const goGetRoleList = () => {
  getRoleList(searchForm).then((result: any) => {
    tableData.value = result.data;
  });
};
goGetRoleList();

// 打开弹窗
const openWindow = (item: any) => {
  isShowModel.value = true;
  if (item.id) {
    // 编辑
    submitForm = {
      id: item.id,
      name: item.name,
      remarks: item.remarks,
      auth_ids: item.auth_ids,
    };
    nextTick(() => {
      item.auth_ids.split(",").forEach((item: any) => {
        const node = tree.value.getNode(item);
        if (node.isLeaf) {
          tree.value.setChecked(node, true);
        }
      });
    });
  }
};

// 删除角色
const handleDelete = (id: number) => {
  ElMessageBox.alert("您确定要删除该角色吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    deleteRole({ id }).then((result: any) => {
      ElMessage({
        message: result.msg,
        type: "success",
      });
      goGetRoleList();
    });
  });
};

// 搜索
const searchEvent = (e: any) => {
  // 简单搜索
  if (typeof e === "string") {
    searchForm.name = e;
  }
  // 高级搜索
  goGetRoleList();
};

const handleClose = () => {
  isShowModel.value = false;
  submitForm = {
    id: "",
    name: "",
    remarks: "",
    auth_ids: "",
  };
  nextTick(() => {
    tree.value.setCheckedKeys([]);
  });
};

// 编辑或新增按钮点击
const submitButton = () => {
  const hafCheckedKeys = tree.value.getHalfCheckedKeys();
  const checkedKeys = tree.value.getCheckedKeys();
  submitForm.auth_ids = checkedKeys.concat(hafCheckedKeys).join(",");
  createOrEditRole(submitForm).then((result: any) => {
    isShowModel.value = false;
    ElMessage({
      message: result.msg,
      type: "success",
    });
    goGetRoleList();
  });
};
</script>
