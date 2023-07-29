<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input
          :placeholder="$t('table.placeholder')"
          type="text"
          v-model="query.mobile"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="searchuser">{{
          $t('table.search')
        }}</el-button>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        v-for="(item, index) in options"
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        :key="index"
      >
        <template v-slot="{ row }" v-if="item.prop === 'status'"
        ><el-switch v-model="row.status" @click="changeStatus(row)" :active-icon="Check" :inactive-icon="Close"/>
        </template>

        <template v-slot="{ row }" v-else-if="item.prop === 'created_at'"
        >{{ $filters.filterTimes(row.created_at) }}
        </template>

        <template #default v-else-if="item.prop === 'action'">
          <el-button type="danger" :icon="Delete"/>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:currentPage="queryForm.pagenum"
      :page-sizes="[2, 10, 25, 50]"
      :page-size="queryForm.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @jumper-change="handleJumperChange"
    />

  </el-card>
</template>

<script setup>
import { Search, Delete, Check, Close } from '@element-plus/icons-vue'
import { getUser, prohibitUser, recoveryUser, searchUser } from '@/api/user.js'
import { ref } from 'vue'
import { options } from './options'
const queryForm = ref({
  pagenum: 1,
  pagesize: 10
})

const query = ref({
  mobile: ''
})

const total = ref(0)
const tableData = ref([])

const initGetUserList = async () => {
  const res = await getUser(queryForm.value)
  total.value = res.total
  tableData.value = res.userList
  tableData.value.forEach(row => {
    if (row.status === 0) {
      row.status = true
    } else if (row.status === 1) {
      row.status = false
    }
  })
}
initGetUserList()

const searchuser = async () => {
  console.log(query.value.mobile)
  const res = await searchUser(query.value)
  total.value = res.total
  tableData.value = res.userList
  tableData.value.forEach(row => {
    if (row.status === 0) {
      row.status = true
    } else if (row.status === 1) {
      row.status = false
    }
  })
}

const changeStatus = async (row) => {
  console.log(row.status)
  if (row.status === false) {
    await prohibitUser(row.user_id)
    await initGetUserList()
  } else if (row.status === true) {
    await recoveryUser(row.user_id)
    await initGetUserList()
  }
}

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetUserList()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetUserList()
}

const handleJumperChange = (pageNum) => {
  console.log(pageNum)
  queryForm.value.pagenum = pageNum
  initGetUserList()
}
</script>

<style lang="scss" scoped></style>
