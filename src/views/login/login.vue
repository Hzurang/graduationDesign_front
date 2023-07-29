<template>
  <div class="login-container" element-loading-background="">
    <el-form ref="formRef" :model="form" class="login-form" :rules="rules">
      <div class="title-container">
        <h3 class="title">管理员登录</h3>
      </div>
      <el-form-item prop="name">
        <svg-icon class="svg-container" icon="user"></svg-icon>
        <el-input v-model="form.username" placeholder="请输入管理员用户名" :maxlength="15"/>
      </el-form-item>
      <el-form-item prop="password">
        <svg-icon class="svg-container" icon="password"></svg-icon>
        <el-input :type="passwordType" v-model="form.password" placeholder="请输入管理员密码"/>
        <svg-icon color="white" :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click="changeType"></svg-icon>
      </el-form-item>
      <el-button type="primary" class="login-button" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const form = ref({
  username: '',
  password: ''
})

const passwordType = ref('password')
const changeType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

const rules = ref({
  username: [
    {
      required: true,
      message: '请输入管理员用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z]+$/,
      message: '请输入英文用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入管理员密码',
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
      message: '密码必须包含大小写英文和数字',
      trigger: 'blur'
    }
  ]
})

const formRef = ref(null)
const handleLogin = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      store.dispatch('app/login', form.value)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      .el-input__wrapper {
        background: transparent;
        box-shadow: 0 0 0 0;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    .login-button {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 32px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
