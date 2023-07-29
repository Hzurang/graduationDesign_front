<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input
          :placeholder="$t('table.placeholderfeedback')"
          type="text"
          v-model="queryForm.query"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search">{{
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
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'"
        ><el-switch v-model="row.mg_state" />
        </template>

        <template v-slot="{ row }" v-else-if="item.prop === 'create_time'"
        >{{ $filters.filterTimes(row.create_time) }}
        </template>

        <template #default v-else-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit" />
          <el-button type="warning" size="small" :icon="Setting" />
          <el-button type="danger" size="small" :icon="Delete" />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:currentPage="queryForm.pagenum"
      :page-sizes="[2, 5, 10, 15]"
      :page-size="queryForm.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

  </el-card>
</template>

<script setup>
import { Search, Edit, Delete, Setting } from '@element-plus/icons-vue'
import { getUser } from '@/api/user.js'
import { ref } from 'vue'
import { options } from './options'
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})
const total = ref(0)
const tableData = ref([])

const initGetUserList = async () => {
  const res = await getUser(queryForm.value)
  console.log(res)
  total.value = res.total
  tableData.value = res.users
}
initGetUserList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetUserList()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetUserList()
}
</script>

<style lang="scss" scoped></style>
