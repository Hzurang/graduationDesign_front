<template>
  <el-dialog
    :model-value="dialogVisible"
    title="单词内容"
    width="70%"
    @close="handleClose"
    @opened="handleOpen"
  >
    <el-form :model="form" label-width="100px" ref="formRef" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="单词ID" prop="wordId">
            <el-input disabled v-model="form.word_id"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单词" prop="word">
            <el-input disabled v-model="form.word"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="音标 <英>" prop="phonetic_trans_eng">
            <el-input v-model="form.phonetic_trans_eng" type="text"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="音标 <美>" prop="phonetic_trans_ame">
            <el-input v-model="form.phonetic_trans_ame" type="text"/>
          </el-form-item>
        </el-col>
      </el-row>
        <el-form-item label="意思" prop="word_meaning">
          <el-input v-model="form.word_meaning" type="text"/>
        </el-form-item>
        <el-form-item label="助记" prop="mnemonic_aid">
          <el-input v-model="form.mnemonic_aid" type="text"/>
        </el-form-item>
        <el-form-item label="例句英文1" prop="sentence_eng_1">
          <el-input v-model="form.sentence_eng_1" type="text"/>
        </el-form-item>
        <el-form-item label="例句中文1" prop="sentence_chi_1">
          <el-input v-model="form.sentence_chi_1" type="text"/>
        </el-form-item>
      <el-form-item label="例句英文2" prop="sentence_eng_2">
        <el-input v-model="form.sentence_eng_2" type="text"/>
      </el-form-item>
      <el-form-item label="例句中文2" prop="sentence_chi_2">
        <el-input v-model="form.sentence_chi_2" type="text"/>
      </el-form-item>
        <el-form-item label="单词类型" prop="word_type">
          <el-input v-model="form.word_type" type="text"/>
        </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { filterType, filterWordTypeToInt } from '@/utils/type'
import { modifyWord } from '@/api/word'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
const emits = defineEmits(['update:modelValue'])
const form = ref({
  word_id: '',
  word: '',
  word_meaning: '',
  phonetic_trans_eng: '',
  phonetic_trans_ame: '',
  sentence_eng_1: '',
  sentence_chi_1: '',
  sentence_eng_2: '',
  sentence_chi_2: '',
  mnemonic_aid: '',
  chi_etymology: '',
  word_type: ''
})

const props = defineProps({
  wordId: String,
  words: String,
  word_meaning: String,
  phonetic_trans_eng: String,
  phonetic_trans_ame: String,
  sentence_eng_1: String,
  sentence_chi_1: String,
  sentence_eng_2: String,
  sentence_chi_2: String,
  mnemonic_aid: String,
  chi_etymology: String,
  word_type: String
})

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleOpen = () => {
  form.value.word = props.words
  form.value.word_id = props.wordId
  form.value.word_meaning = props.word_meaning
  form.value.phonetic_trans_eng = props.phonetic_trans_eng
  form.value.phonetic_trans_ame = props.phonetic_trans_ame
  form.value.sentence_eng_1 = props.sentence_eng_1
  form.value.sentence_chi_1 = props.sentence_chi_1
  form.value.sentence_eng_2 = props.sentence_eng_2
  form.value.sentence_chi_2 = props.sentence_chi_2
  form.value.mnemonic_aid = props.mnemonic_aid
  form.value.chi_etymology = props.chi_etymology
  form.value.word_type = filterType(props.word_type)
}

const handleConfirm = async () => {
  form.value.word_type = filterWordTypeToInt(form.value.word_type)
  await modifyWord(form.value)
  ElMessage({
    message: i18n.global.t('message.modifySuccess'),
    type: 'success'
  })
  handleClose()
  window.location.reload()
}

const formRef = ref(null)
</script>

<style lang="scss" scoped></style>
