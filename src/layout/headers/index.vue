<template>
  <div class="navbar">
    <Hamburger />
    <Breadcrumb />
    <div class="navbar-right">
      <el-button id="reset" type="danger" @click="dialogFormVisible = true">重置数据库</el-button>
      <Driver class="navbar-item" />
      <screen-full class="navbar-item" />
      <Lang class="navbar-item" />
      <Avatar class="navbar-item" />
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="提示">
    <el-form :model="form">
      <el-form-item label="管理员用户名" label-width="140px">
        <el-input v-model="form.user_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="管理员密码" label-width="140px">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="reset">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import Hamburger from './components/hamburger.vue'
import Breadcrumb from './components/breadcrumb.vue'
import Avatar from './components/avatar.vue'
import Lang from './components/lang.vue'
import ScreenFull from './components/screenFull.vue'
import Driver from './components/driver'
import { ref } from 'vue'
import { resetDb } from '@/api/common'

const dialogFormVisible = ref(false)

const form = ref({
  user_name: '',
  password: ''
})

const reset = async () => {
  await resetDb(form.value)
  dialogFormVisible.value = false
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  .navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ::v-deep .navbar-item {
      display: inline-block;
      margin-left: 18px;
      font-size: 22px;
      color: #5a5e66;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
