<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input
          :placeholder="$t('table.placeholderword')"
          type="text"
          v-model="query.word"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="searchword">{{
          $t('table.search')
        }}</el-button>
      <el-button type="primary" @click="handleDialogValue">{{ $t('table.addword') }}</el-button>
      <el-col :span="7">
        <el-cascader v-model="queryForm.wordtype" :options="wordtype" @change="handleChange" />
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

        <template v-slot="{ row }" v-if="item.prop === 'word_type'"
        >{{ filterType(row.word_type) }}
        </template>

        <template v-slot="{ row }" v-else-if="item.prop === 'created_at'"
        >{{ $filters.filterTimes(row.created_at) }}
        </template>

        <template v-slot="{ row }" v-else-if="item.prop === 'action'">
          <el-button size="small" :icon="Search" @click="showWord(row)"/>
          <el-button type="primary" size="small" :icon="Edit" @click="modifyWord(row)"/>
          <el-button type="danger" size="small" :icon="Delete" @click="deleteword(row)"/>
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
      :words="words"
      :phonetic_trans_eng="phoneticTransEng"
      :phonetic_trans_ame="phoneticTransAme"
      :word_meaning="wordMeaning"
      :mnemonic_aid="mnemonicAid"
      :sentence_eng_1="sentenceEng1"
      :sentence_chi_1="sentenceChi1"
      :sentence_eng_2="sentenceEng2"
      :sentence_chi_2="sentenceChi2"
      :word_type="wordType"
    />

    <DialogThree
      v-model="dialogVisible3"
      v-if="dialogVisible3"
      :words="words"
      :wordId="wordId"
      :phonetic_trans_eng="phoneticTransEng"
      :phonetic_trans_ame="phoneticTransAme"
      :word_meaning="wordMeaning"
      :mnemonic_aid="mnemonicAid"
      :sentence_eng_1="sentenceEng1"
      :sentence_chi_1="sentenceChi1"
      :sentence_eng_2="sentenceEng2"
      :sentence_chi_2="sentenceChi2"
      :word_type="wordType"
    />
  </el-card>
</template>

<script setup>
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { getWord, showWordInfo, searchWord, deleteWord } from '@/api/word'
import { ref } from 'vue'
import { options } from './options'
import { wordtype } from './wordtype'
import { filterType } from '@/utils/type'
import Dialog from './component/dialog.vue'
import DialogTwo from './component/dialogWordShow.vue'
import DialogThree from './component/dialogWordModify.vue'

const queryForm = ref({
  wordtype: '',
  pagenum: 1,
  pagesize: 15
})

const query = ref({
  word: ''
})

const total = ref(0)
const tableData = ref([])

const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const dialogVisible3 = ref(false)

const initGetWordList = async () => {
  const res = await getWord(queryForm.value)
  query.value.word = ''
  total.value = res.total
  tableData.value = res.wordList
}
initGetWordList()

const searchword = async () => {
  console.log(query.value.word)
  const res = await searchWord(query.value)
  total.value = res.total
  tableData.value = res.wordList
}

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetWordList()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetWordList()
}

const handleJumperChange = (pageNum) => {
  console.log(pageNum)
  queryForm.value.pagenum = pageNum
  initGetWordList()
}

const handleChange = (wordtype) => {
  console.log(wordtype[0])
  queryForm.value.wordtype = wordtype[0]
  queryForm.value.pagenum = 1
  initGetWordList()
}

// 更新是否显示对话框
const handleDialogValue = async () => {
  dialogVisible.value = true
  queryForm.value.pagenum = 1
  await initGetWordList()
}
const wordId = ref()
const words = ref()
const phoneticTransEng = ref()
const phoneticTransAme = ref()
const wordMeaning = ref()
const mnemonicAid = ref()
const sentenceEng1 = ref()
const sentenceChi1 = ref()
const sentenceEng2 = ref()
const sentenceChi2 = ref()
const wordType = ref()

const showWord = async (row) => {
  dialogVisible2.value = true
  const res = await showWordInfo(row.word_id)
  words.value = res.word
  phoneticTransEng.value = res.phonetic_trans_eng
  phoneticTransAme.value = res.phonetic_trans_ame
  wordMeaning.value = res.word_meaning
  mnemonicAid.value = res.mnemonic_aid
  sentenceEng1.value = res.sentence_eng_1
  sentenceChi1.value = res.sentence_chi_1
  sentenceEng2.value = res.sentence_eng_2
  sentenceChi2.value = res.sentence_chi_2
  wordType.value = res.word_type
}

const modifyWord = async (row) => {
  dialogVisible3.value = true
  const res = await showWordInfo(row.word_id)
  wordId.value = res.word_id
  words.value = res.word
  phoneticTransEng.value = res.phonetic_trans_eng
  phoneticTransAme.value = res.phonetic_trans_ame
  wordMeaning.value = res.word_meaning
  mnemonicAid.value = res.mnemonic_aid
  sentenceEng1.value = res.sentence_eng_1
  sentenceChi1.value = res.sentence_chi_1
  sentenceEng2.value = res.sentence_eng_2
  sentenceChi2.value = res.sentence_chi_2
  wordType.value = res.word_type
}

const deleteword = async (row) => {
  await deleteWord(row.word_id)
  await initGetWordList()
}
</script>

<style lang="scss" scoped></style>
