<template>
  <el-dialog
    :model-value="dialogVisible"
    title="添加单词"
    width="30%"
    @close="handleClose"
  >
    <el-form :model="form" label-width="100px" ref="formRef" :rules="rules">
      <el-form-item label="单词" prop="word">
        <el-input v-model="form.word"/>
      </el-form-item>
      <el-form-item label="单词助记" prop="mnemonic_aid">
        <el-input v-model="form.mnemonic_aid" type="text"/>
      </el-form-item>
      <el-form-item label="中文词源" prop="chi_etymology">
        <el-input v-model="form.chi_etymology" />
      </el-form-item>
      <el-form-item label="单词类型" prop="word_type">
        <el-cascader v-model="form.word_type" :options="wordtype"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { addWord } from '@/api/word'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import { wordtype } from '../wordtype'
import { filterWordTypeToInt } from '@/utils/type'
const emits = defineEmits(['update:modelValue'])

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = async () => {
  form.value.word_type = filterWordTypeToInt(form.value.word_type[0])
  await addWord(form.value)
  ElMessage({
    message: i18n.global.t('message.addSuccess'),
    type: 'success'
  })
  handleClose()
}

const formRef = ref(null)
const form = ref({
  word: '',
  mnemonic_aid: '',
  chi_etymology: '',
  word_type: ''
})

const rules = ref({
  word: [
    {
      required: true,
      message: '请填写正确的单词',
      trigger: 'blur'
    }
  ],
  mnemonic_aid: [
    {
      required: true,
      message: '请填写正确的单词助记信息',
      trigger: 'blur'
    }
  ],
  chi_etymology: [
    {
      required: true,
      message: '请填写正确的单词中文词源信息',
      trigger: 'blur'
    }
  ],
  word_type: [
    {
      required: true,
      message: '请选择的单词类型',
      trigger: 'blur'
    }
  ]
})
</script>

<style lang="scss" scoped></style>
