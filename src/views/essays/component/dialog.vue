<template>
  <el-dialog
    :model-value="dialogVisible"
    title="添加文章"
    width="65%"
    @close="handleClose"
  >
    <el-form :model="form" label-width="100px" ref="formRef" :rules="rules">
      <el-form-item label="文章标题" prop="essay_title">
        <el-input v-model="form.essay_title"/>
      </el-form-item>
      <el-form-item label="文章作者" prop="essay_author">
        <el-input v-model="form.essay_author" type="text"/>
      </el-form-item>
      <el-form-item label="文章内容" prop="essay_content">
        <el-input v-model="form.essay_content" />
      </el-form-item>
      <el-form-item label="是否可评论" prop="essay_isok">
        <el-cascader v-model="form.essay_isok" :options="commenttype"/>
      </el-form-item>
      <el-form-item label="文章类型" prop="essay_type">
        <el-cascader v-model="form.essay_type" :options="essaytype"/>
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
import { addEssay } from '@/api/essay'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import { essaytype } from '../essaytype'
import { commenttype } from '../commenttype'
import { filterCommentEngTypeToInt, filterEssayEngTypeToInt } from '@/utils/type'
const emits = defineEmits(['update:modelValue'])

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = async () => {
  form.value.essay_type = filterEssayEngTypeToInt(form.value.essay_type[0])
  form.value.essay_isok = filterCommentEngTypeToInt(form.value.essay_isok[0])
  await addEssay(form.value)
  ElMessage({
    message: i18n.global.t('message.addSuccess'),
    type: 'success'
  })
  handleClose()
  window.location.reload()
}

const formRef = ref(null)
const form = ref({
  essay_title: '',
  essay_author: '',
  essay_content: '',
  essay_isok: '',
  essay_type: ''
})

const rules = ref({
  essay_title: [
    {
      required: true,
      message: '请填写正确的文章标题',
      trigger: 'blur'
    }
  ],
  essay_author: [
    {
      required: true,
      message: '请填写正确的文章作者信息',
      trigger: 'blur'
    }
  ],
  essay_content: [
    {
      required: true,
      message: '请填写正确的文章内容',
      trigger: 'blur'
    }
  ],
  essay_isok: [
    {
      required: true,
      message: '请确认文章是否可评论',
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
