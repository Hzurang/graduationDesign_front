<template>
  <el-card>
    <el-row :gutter="20">
      <el-button type="primary" @click="handleDialogValue">{{ $t('table.addlisten') }}</el-button>
      <el-col :span="7">
        <el-cascader v-model="queryForm.listentype" :options="listentype" @change="handleChange" />
      </el-col>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        v-for="(item, index) in options"
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        :key="index"
        :show-overflow-tooltip="true"
      >

        <template v-slot="{ row }" v-if="item.prop === 'listen_type'"
        >{{ filterListenType(row.listen_type) }}
        </template>

        <template v-slot="{ row }" v-else-if="item.prop === 'created_at'"
        >{{ $filters.filterTimes(row.created_at) }}
        </template>

        <template v-slot="{ row }" v-else-if="item.prop === 'action'">
          <el-button size="small" :icon="Search" @click="showListen(row)"/>
          <el-button type="primary" size="small" :icon="Edit" @click="modifyListen(row)"/>
          <el-button type="danger" size="small" :icon="Delete" @click="deletelisten(row)"/>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:currentPage="queryForm.pagenum"
      :page-sizes="[2, 15, 25, 50]"
      :page-size="queryForm.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @jumper-change="handleJumperChange"
    />

    <Dialog
      v-model="dialogVisible"
      v-if="dialogVisible"
    />

    <DialogTwo
      v-model="dialogVisible2"
      v-if="dialogVisible2"
      :listen_title="listenTitle"
      :listen_source="listenSource"
      :listen_editor="listenEditor"
      :listen_media_path="listenMediaPath"
      :listen_mp_3_path="listenMp3Path"
      :listen_second_type="listenSecondType"
      :listen_content="listenContent"
      :publish_at="publishAt"
      :listen_type="listenType"
      :listen_collect_num="listenCollectNum"
    />

    <DialogThree
      v-model="dialogVisible3"
      v-if="dialogVisible3"
      :listen_id="listenID"
      :listen_title="listenTitle"
      :listen_source="listenSource"
      :listen_editor="listenEditor"
      :listen_media_path="listenMediaPath"
      :listen_mp_3_path="listenMp3Path"
      :listen_second_type="listenSecondType"
      :listen_content="listenContent"
      :publish_at="publishAt"
      :listen_type="listenType"
      :listen_collect_num="listenCollectNum"
    />
  </el-card>
</template>

<script setup>
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { options } from './options'
import { listentype } from './listentype'
import { filterListenType, filterListenTypeToEng } from '@/utils/type'
import Dialog from './component/dialog.vue'
import DialogTwo from './component/dialogListenShow.vue'
import DialogThree from './component/dialogListenModify.vue'
import { dateToYYYYMMDD } from '@/utils/date'
import { deleteListen, getListen, showListenInfo } from '@/api/listen'

const queryForm = ref({
  listentype: '',
  pagenum: 1,
  pagesize: 15
})

const total = ref(0)
const tableData = ref([])

const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const dialogVisible3 = ref(false)

const initGetListenList = async () => {
  const res = await getListen(queryForm.value)
  total.value = res.total
  tableData.value = res.listenList
}
initGetListenList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetListenList()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetListenList()
}

const handleJumperChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetListenList()
}

const handleChange = (listentype) => {
  queryForm.value.listentype = listentype[0]
  queryForm.value.pagenum = 1
  initGetListenList()
}

// 更新是否显示对话框
const handleDialogValue = async () => {
  dialogVisible.value = true
  queryForm.value.pagenum = 1
}

const listenID = ref()
const listenTitle = ref()
const listenSource = ref()
const listenEditor = ref()
const listenType = ref()
const listenMediaPath = ref()
const listenMp3Path = ref()
const listenSecondType = ref()
const listenContent = ref()
const publishAt = ref()
const listenCollectNum = ref()

const showListen = async (row) => {
  dialogVisible2.value = true
  const res = await showListenInfo(row.listen_id)
  listenTitle.value = res.listen_title
  listenSource.value = res.listen_source
  listenEditor.value = res.listen_editor
  listenMediaPath.value = res.listen_media_path
  listenMp3Path.value = res.listen_mp_3_path
  listenSecondType.value = res.listen_second_type
  listenContent.value = res.listen_content
  publishAt.value = dateToYYYYMMDD(res.publish_at)
  listenType.value = filterListenType(res.listen_type)
  listenCollectNum.value = res.listen_collect_num
}

const modifyListen = async (row) => {
  dialogVisible3.value = true
  const res = await showListenInfo(row.listen_id)
  listenID.value = res.listen_id
  listenTitle.value = res.listen_title
  listenSource.value = res.listen_source
  listenEditor.value = res.listen_editor
  listenMediaPath.value = res.listen_media_path
  listenMp3Path.value = res.listen_mp_3_path
  listenSecondType.value = res.listen_second_type
  listenContent.value = res.listen_content
  publishAt.value = dateToYYYYMMDD(res.publish_at)
  listenType.value = filterListenTypeToEng(res.listen_type)
}

const deletelisten = async (row) => {
  await deleteListen(row.listen_id)
  await initGetListenList()
}
</script>

<style lang="scss" scoped></style>
