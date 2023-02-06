<template>
  <el-button
    v-has="'sys:auth:add'"
    type="primary"
    size="mini"
    style="margin-bottom: 15px"
    @click="openWindow"
    >新增</el-button
  >
  <!-- 表格 -->
  <el-table
    class="table-box"
    :data="tableData"
    row-key="id"
    border
    default-expand-all
  >
    <el-table-column prop="name" label="菜单名称" align="center" />
    <el-table-column label="类型" align="center">
      <template #default="scope">
        <el-tag v-if="scope.row.type == 1">目录</el-tag>
        <el-tag v-if="scope.row.type == 2" type="success">菜单</el-tag>
        <el-tag v-if="scope.row.type == 3" type="danger">按钮</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="图标" align="center">
      <template #default="scope">
        <el-icon>
          <component :is="scope.row.icon" class="w-10 h-10" />
        </el-icon>
      </template>
    </el-table-column>
    <el-table-column prop="router_name" label="路由名称" align="center" />
    <el-table-column prop="router_url" label="路由地址" align="center" />
    <el-table-column prop="component_url" label="组件路径" align="center" />
    <el-table-column prop="auth_name" label="权限字段" align="center" />
    <el-table-column label="操作" width="200" align="center">
      <template #default="scope">
        <el-button
          v-has="'sys:auth:edit'"
          type="primary"
          size="mini"
          @click="openWindow(scope.row)"
          >编辑</el-button
        >
        <el-button
          v-has="'sys:auth:del'"
          type="danger"
          size="mini"
          @click="handleDelete(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- 新增/编辑弹窗 -->
  <el-dialog
    v-model="isShowModel"
    :title="submitForm.id ? '编辑' : '新增'"
    :before-close="handleClose"
  >
    <div class="flex items-center mb-4">
      <div class="mr-3">菜单类型</div>
      <el-radio-group v-model="submitForm.type">
        <el-radio :label="1">目录</el-radio>
        <el-radio :label="2">菜单</el-radio>
        <el-radio :label="3">按钮</el-radio>
      </el-radio-group>
    </div>
    <el-form :inline="true" :model="submitForm">
      <el-form-item label="上级菜单">
        <el-cascader
          v-model="submitForm.pid"
          :options="tableData"
          :show-all-levels="false"
          placeholder="请选择上级菜单"
          :props="{ label: 'name', value: 'id', checkStrictly: true }"
        />
      </el-form-item>
      <el-form-item label="菜单名称">
        <el-input
          v-model="submitForm.name"
          placeholder="请输入菜单名称"
          class="w-[190px]"
        />
      </el-form-item>
      <template v-if="submitForm.type === 1">
        <el-form-item label="权限字段">
          <el-input
            v-model="submitForm.auth_name"
            placeholder="请输入权限字段"
            class="w-[190px]"
          />
        </el-form-item>
        <el-form-item label="菜单序号">
          <el-input
            v-model="submitForm.sort"
            placeholder="请输入菜单序号"
            class="w-[190px]"
          />
        </el-form-item>
        <el-form-item label="路由名称">
          <el-input
            v-model="submitForm.router_name"
            placeholder="请输入路由名称"
            class="w-[190px]"
          />
        </el-form-item>
        <el-form-item label="路由地址">
          <el-input
            v-model="submitForm.router_url"
            placeholder="请输入路由地址"
            class="w-[190px]"
          />
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input
            v-model="submitForm.icon"
            placeholder="请输入菜单图标"
            class="w-[190px]"
          />
        </el-form-item>
      </template>
      <template v-if="submitForm.type === 2">
        <el-form-item label="权限字段">
          <el-input
            v-model="submitForm.auth_name"
            placeholder="请输入权限字段"
            class="w-[190px]"
          />
        </el-form-item>
        <el-form-item label="菜单序号">
          <el-input
            v-model="submitForm.sort"
            placeholder="请输入菜单序号"
            class="w-[190px]"
          />
        </el-form-item>
        <el-form-item label="路由名称">
          <el-input
            v-model="submitForm.router_name"
            placeholder="请输入路由名称"
            class="w-[190px]"
          />
        </el-form-item>
        <el-form-item label="路由地址">
          <el-input
            v-model="submitForm.router_url"
            placeholder="请输入路由地址"
            class="w-[190px]"
          />
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input
            v-model="submitForm.component_url"
            placeholder="请输入组件路径"
            class="w-[190px]"
          />
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input
            v-model="submitForm.icon"
            placeholder="请输入菜单图标1"
            class="w-[190px]"
          />
        </el-form-item>
        <el-form-item label="layout">
          <el-switch v-model="submitForm.layout" />
        </el-form-item>
      </template>
      <template v-if="submitForm.type === 3">
        <el-form-item label="权限字段">
          <el-input
            v-model="submitForm.auth_name"
            placeholder="请输入权限字段"
            class="w-[190px]"
          />
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitButton">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { deleteAuth, getAuthList, createOrEditAuth } from "./service";

const tableData = ref([]);
const isShowModel = ref(false);
const submitForm = ref({
  id: "",
  type: 1,
  pid: "",
  name: "",
  icon: "",
  layout: true,
  auth_name: "",
  router_name: "",
  router_url: "",
  component_url: "",
  sort: "",
});

const goGetAuthList = () => {
  getAuthList().then((result: any) => {
    tableData.value = result.data;
  });
};

goGetAuthList();

const submitButton = () => {
  createOrEditAuth(submitForm.value).then((result: any) => {
    isShowModel.value = false;
    ElMessage({
      message: result.msg,
      type: "success",
    });
    goGetAuthList();
  });
};

// 打开新增/编辑弹窗
const openWindow = (item: any) => {
  isShowModel.value = true;
  if (item.id) {
    // 编辑
    submitForm.value = {
      id: item.id,
      type: item.type,
      pid: item.pid,
      name: item.name,
      icon: item.icon,
      layout: Boolean(item.layout),
      auth_name: item.auth_name,
      router_name: item.router_name,
      router_url: item.router_url,
      component_url: item.component_url,
      sort: item.sort,
    };
  }
};

// 删除
const handleDelete = (id: number) => {
  ElMessageBox.alert("您确定要删除吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    deleteAuth({ id }).then((result: any) => {
      ElMessage({
        message: result.msg,
        type: "success",
      });
      goGetAuthList();
    });
  });
};

const handleClose = () => {
  isShowModel.value = false;
  submitForm.value = {
    id: "",
    type: 1,
    pid: "",
    name: "",
    icon: "",
    layout: true,
    auth_name: "",
    router_name: "",
    router_url: "",
    component_url: "",
    sort: "",
  };
};
</script>
