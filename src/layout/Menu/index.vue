<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
    :collapse="!$store.getters.sideBarType"
  >
    <el-menu-item
      :id="item.name"
      :index="item.path"
      v-for="(item) in menusList"
      :key="item.id"
    >
      <template #title>
        <svg-icon :icon="iconList[item.id]"></svg-icon>
        <span>{{ item.authName }}</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
// import { menuList } from '@/api/menu'
import { ref } from 'vue'
// import variables from '@/styles/variables.scss'

const iconList = ['user_ad', 'word', 'essay', 'listen', 'feedback']
// const icon = ref('menu')

const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const menusList = ref([
  { id: 0, authName: '用户管理', path: '/users', name: 'user' },
  { id: 1, authName: '单词管理', path: '/word', name: 'word' },
  { id: 2, authName: '文章管理', path: '/essay', name: 'essay' },
  { id: 3, authName: '听力管理', path: '/listen', name: 'listen' },
  { id: 4, authName: '反馈管理', path: '/feedback', name: 'feedback' }
])
// const initMenusList = async () => {
//   menusList.value = await menuList()
// }
// initMenusList()

// const savePath = (path) => {
//   console.log(path)
//   sessionStorage.setItem('path', `/${path}`)
// }
</script>

<style lang="scss" scoped>
</style>
