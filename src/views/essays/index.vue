<template>
  <el-card>
    <el-row :gutter="20">
      <el-button type="primary" @click="handleDialogValue">{{ $t('table.addessay') }}</el-button>
      <el-col :span="7">
        <el-cascader v-model="queryForm.essaytype" :options="essaytype" @change="handleChange" />
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

        <template v-slot="{ row }" v-if="item.prop === 'essay_type'"
        >{{ filterEssayType(row.essay_type) }}
        </template>

        <template v-slot="{ row }" v-else-if="item.prop === 'created_at'"
        >{{ $filters.filterTimes(row.created_at) }}
        </template>

        <template v-slot="{ row }" v-else-if="item.prop === 'action'">
          <el-button size="small" :icon="Search" @click="showEssay(row)"/>
          <el-button type="primary" size="small" :icon="Edit" @click="modifyEssay(row)"/>
          <el-button type="danger" size="small" :icon="Delete" @click="deleteessay(row)"/>
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
      :essay_id="essayID"
      :essay_title="essayTitle"
      :essay_author="essayAuthor"
      :publish_at="publishAt"
      :essay_content="essayContent"
      :essay_isok="essayIsok"
      :essay_type="essayType"
      :essay_collect_num="essayCollectNum"
    />

    <DialogThree
      v-model="dialogVisible3"
      v-if="dialogVisible3"
      :essay_id="essayID"
      :essay_title="essayTitle"
      :essay_author="essayAuthor"
      :publish_at="publishAt"
      :essay_content="essayContent"
      :essay_isok="essayIsok"
      :essay_type="essayType"
      :essay_collect_num="essayCollectNum"
    />
  </el-card>
</template>

<script setup>
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { deleteEssay, getEssay, showEssayInfo } from '@/api/essay'
import { ref } from 'vue'
import { options } from './options'
import { essaytype } from './essaytype'
import { filterCommentType, filterEssayEngType, filterEssayType } from '@/utils/type'
import Dialog from './component/dialog.vue'
import DialogTwo from './component/dialogEssayShow.vue'
import DialogThree from './component/dialogEssayModify.vue'
import { dateToYYYYMMDD } from '@/utils/date'

const queryForm = ref({
  essaytype: '',
  pagenum: 1,
  pagesize: 15
})

const total = ref(0)
const tableData = ref([])

const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const dialogVisible3 = ref(false)

const initGetEssayList = async () => {
  const res = await getEssay(queryForm.value)
  console.log(res.total)
  total.value = res.total
  tableData.value = res.essayList
}
initGetEssayList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetEssayList()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetEssayList()
}

const handleJumperChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetEssayList()
}

const handleChange = (essaytype) => {
  queryForm.value.essaytype = essaytype[0]
  queryForm.value.pagenum = 1
  initGetEssayList()
}

// 更新是否显示对话框
const handleDialogValue = async () => {
  dialogVisible.value = true
  queryForm.value.pagenum = 1
}

const essayID = ref()
const essayTitle = ref()
const essayAuthor = ref()
const publishAt = ref()
const essayContent = ref()
const essayIsok = ref()
const essayType = ref()
const essayCollectNum = ref()

const showEssay = async (row) => {
  dialogVisible2.value = true
  const res = await showEssayInfo(row.essay_id)
  essayTitle.value = res.essay_title
  essayAuthor.value = res.essay_author
  publishAt.value = dateToYYYYMMDD(res.publish_at)
  essayContent.value = res.essay_content
  essayIsok.value = filterCommentType(res.essay_isok)
  essayType.value = filterEssayType(res.essay_type)
  essayCollectNum.value = res.essay_collect_num
}

const modifyEssay = async (row) => {
  dialogVisible3.value = true
  const res = await showEssayInfo(row.essay_id)
  essayID.value = res.essay_id
  essayTitle.value = res.essay_title
  essayAuthor.value = res.essay_author
  publishAt.value = dateToYYYYMMDD(res.publish_at)
  essayContent.value = res.essay_content
  essayIsok.value = filterCommentType(res.essay_isok)
  essayType.value = filterEssayEngType(res.essay_type)
  essayCollectNum.value = res.essay_collect_num
}

const deleteessay = async (row) => {
  await deleteEssay(row.essay_id)
  await initGetEssayList()
}
</script>

<style lang="scss" scoped></style>
