<template>
  <!-- 搜索 -->
  <button-search placeholder="要搜索的部门" @search="searchEvent">
    <!-- 左边 -->
    <template #left>
      <el-button
        v-has="'sys:mech:add'"
        type="primary"
        size="mini"
        @click="openWindow"
        >添加根部门</el-button
      >
    </template>
    <!-- 高级搜索表单 -->
    <template #form>
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="部门名称">
          <el-input
            v-model="searchForm.mechName"
            class="w-[160px]"
            placeholder="要搜索的部门"
            size="mini"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input
            v-model="searchForm.mechCode"
            class="w-[160px]"
            placeholder="要搜索的编码"
            size="mini"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="部门电话">
          <el-input
            v-model="searchForm.mechPhone"
            class="w-[160px]"
            placeholder="要搜索的电话"
            size="mini"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="searchEvent"
            >搜索</el-button
          >
          <el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
        </el-form-item>
      </el-form>
    </template>
  </button-search>
  <!-- 表格 -->
  <el-table
    class="mt-5"
    :data="tableData"
    row-key="id"
    border
    default-expand-all
  >
    <el-table-column prop="name" label="部门名称" align="center" />
    <el-table-column prop="code" label="部门编码" align="center" />
    <el-table-column prop="phone" label="部门电话" align="center" />
    <el-table-column label="操作" width="250" align="center">
      <template #default="scope">
        <el-button
          v-has="'sys:mech:edit'"
          type="primary"
          size="mini"
          @click="openWindow(scope.row)"
          >编辑</el-button
        >
        <el-button
          v-has="'sys:mech:del'"
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
      <el-form-item label="上级部门">
        <el-cascader
          v-model="submitForm.pid"
          :options="tableData"
          :show-all-levels="false"
          placeholder="请选择上级部门"
          :props="{ label: 'name', value: 'id', checkStrictly: true }"
        />
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input
          v-model="submitForm.name"
          placeholder="请输入部门名称"
          class="w-[190px]"
        />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input
          v-model="submitForm.code"
          placeholder="请输入部门编码"
          class="w-[190px]"
        />
      </el-form-item>
      <el-form-item label="部门电话">
        <el-input
          v-model="submitForm.phone"
          placeholder="请输入部门电话"
          class="w-[190px]"
        />
      </el-form-item>
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
import buttonSearch from "@/components/ButtonSearch/index.vue";
import Tools from "@/utils/tools";
import { getMechList, deleteMech, createOrEditMech } from "./service";

let searchForm = reactive({
  mechName: "", // 部门名称
  mechCode: "", // 部门编码
  mechPhone: "", // 部门电话
});

let submitForm = reactive({
  id: "", // 部门ID
  pid: "", // 上级部门ID
  name: "", // 部门名称
  code: "", // 部门编码
  phone: "", // 部门电话
});

const tableData = ref([]);
const isShowModel = ref(false);

// 获取部门列表
const goGetMechList = () => {
  getMechList(searchForm).then((result: any) => {
    tableData.value = Tools.arrayToTree(result.data);
  });
};
goGetMechList();

// 搜索
const searchEvent = (e: any = false) => {
  // 简单搜索
  if (typeof e === "string") {
    searchForm.mechName = e;
  }
  // 高级搜索
  goGetMechList();
};

// 清空筛选条件
const clearSearch = () => {
  searchForm = {
    mechName: "", // 部门名称
    mechCode: "", // 部门编码
    mechPhone: "", // 部门手机号
  };
};

// 打开新增/编辑弹窗
const openWindow = (item: any) => {
  isShowModel.value = true;
  if (item.id) {
    // 编辑
    submitForm = {
      id: item.id,
      pid: item.pid,
      name: item.name,
      code: item.code,
      phone: item.phone,
    };
  }
};

// 编辑或新增按钮点击
const submitButton = () => {
  createOrEditMech(submitForm).then((result: any) => {
    isShowModel.value = false;
    ElMessage({
      message: result.msg,
      type: "success",
    });
    goGetMechList();
  });
};

// 弹窗关闭事件
const handleClose = () => {
  isShowModel.value = false;
  searchForm = {
    mechName: "", // 部门名称
    mechCode: "", // 部门编码
    mechPhone: "", // 部门电话
  };
};

// 删除
const handleDelete = (id: number) => {
  ElMessageBox.alert("您确定要删除该部门吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    deleteMech({ id }).then((result: any) => {
      ElMessage({
        message: result.msg,
        type: "success",
      });
      goGetMechList();
    });
  });
};
</script>
