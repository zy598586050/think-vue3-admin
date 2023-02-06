<template>
  <div class="flex w-full">
    <div class="w-[210px] h-screen border-r-1">
      <el-tree
        :data="leftTree"
        :props="{ label: 'name', children: 'children' }"
        default-expand-all
        highlight-current
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      />
    </div>
    <div class="w-full pl-4">
      <!-- 搜索 -->
      <button-search placeholder="要搜索的账号" @search="searchEvent">
        <!-- 左边 -->
        <template #left>
          <el-button
            v-has="'sys:mech:add'"
            type="primary"
            size="mini"
            @click="openWindow"
            >添加</el-button
          >
        </template>
        <!-- 高级搜索表单 -->
        <template #form>
          <el-form :inline="true" :model="searchForm" class="mt-2">
            <el-form-item label="姓名">
              <el-input
                v-model="searchForm.name"
                class="w-[160px]"
                placeholder="要搜索的姓名"
                size="mini"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input
                v-model="searchForm.account"
                class="w-[160px]"
                placeholder="要搜索的账号"
                size="mini"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="searchEvent"
                >搜索</el-button
              >
              <el-button size="mini" @click="clearSearch"
                >清空筛选条件</el-button
              >
            </el-form-item>
          </el-form>
        </template>
      </button-search>
      <!-- 表格 -->
      <el-table class="mt-5" :data="tableData" border>
        <el-table-column prop="mech_name" label="所属部门" align="center" />
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column prop="account" label="账号" align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button
              v-has="'sys:user:edit'"
              type="primary"
              size="mini"
              @click="openWindow(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-has="'sys:user:del'"
              type="danger"
              size="mini"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        style="margin-top: 20px"
        :current-page="page.current"
        :page-sizes="page.sizes"
        :page-size="page.size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="isShowModel"
      :title="submitForm.id ? '编辑' : '新增'"
      :before-close="handleClose"
    >
      <el-form :inline="true" :model="submitForm">
        <el-form-item label="所属部门">
          <el-cascader
            v-model="submitForm.mech_id"
            :options="leftTree"
            :show-all-levels="false"
            placeholder="请选择所属部门"
            :props="{ label: 'name', value: 'id', checkStrictly: true }"
          />
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input
            v-model="submitForm.name"
            placeholder="请输入用户姓名"
            class="w-[190px]"
          />
        </el-form-item>
        <el-form-item label="用户账号">
          <el-input
            v-model="submitForm.account"
            placeholder="请输入用户账号"
            class="w-[190px]"
          />
        </el-form-item>
        <el-form-item v-has="'sys:user:dist'" label="所属角色">
          <el-select v-model="submitForm.role_id" placeholder="请选择角色">
            <el-option
              v-for="(item, index) in roleList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitButton">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import buttonSearch from "@/components/ButtonSearch/index.vue";
import { getMechList } from "../mech/service";
import { getRoleList } from "../role/service";
import { getUserByMech, deleteUser, createOrEditUser } from "./service";
import Tools from "@/utils/tools";

const leftTree = ref([]);
const roleList: any = ref([]);
const mech_id = ref();
const tableData = ref([]);
const isShowModel = ref(false);
const searchForm = reactive({
  name: "",
  account: "",
});
const page = reactive({
  current: 1, // 当前在第几页
  sizes: [10, 20, 50, 100], // 每页显示多少条数据
  size: 10, // 每页显示多少条
  total: 0, // 共多少条数据
});
let submitForm = reactive({
  id: "",
  mech_id: "",
  name: "",
  account: "",
  role_id: "",
});

// 获取部门列表
getMechList().then((result: any) => {
  leftTree.value = Tools.arrayToTree(result.data);
});

// 获取角色列表
getRoleList().then((result: any) => {
  roleList.value = result.data;
});

// 打开新增/编辑弹窗
const openWindow = (item: any) => {
  isShowModel.value = true;
  if (item.id) {
    // 编辑
    submitForm = {
      id: item.id,
      name: item.name,
      account: item.account,
      mech_id: mech_id.value,
      role_id: item.role_id,
    };
  }
};

// 根据部门查询用户
const getUser = () => {
  getUserByMech({
    ...searchForm,
    mech_id: mech_id.value,
    current: page.current,
    size: page.size,
  }).then((result: any) => {
    tableData.value = result.data.list;
    page.total = result.data.totalCount;
  });
};

// 树结构点击事件
const handleNodeClick = (item: any) => {
  mech_id.value = item.id;
};

// 搜索
const searchEvent = (e: any) => {
  // 简单搜索
  if (typeof e === "string") {
    searchForm.account = e;
  }
  // 高级搜索
  getUser();
};

const clearSearch = () => {
  searchForm.account = "";
  searchForm.name = "";
};

const handleSizeChange = (val: number) => {
  page.size = val;
  getUser();
};

const handleCurrentChange = (val: number) => {
  page.current = val;
  getUser();
};

// 删除
const handleDelete = (id: string) => {
  ElMessageBox.alert("您确定要删除该用户吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    deleteUser({ id }).then((result: any) => {
      ElMessage({
        message: result.msg,
        type: "success",
      });
      getUser();
    });
  });
};
const handleClose = () => {
  isShowModel.value = false;
  submitForm = {
    id: "",
    name: "",
    account: "",
    mech_id: "",
    role_id: "",
  };
};

// 编辑或新增按钮点击
const submitButton = () => {
  createOrEditUser(submitForm).then((result: any) => {
    isShowModel.value = false;
    ElMessage({
      message: result.msg,
      type: "success",
    });
    getUser();
  });
};
</script>
