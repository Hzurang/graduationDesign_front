<template>
  <el-dialog
    :model-value="dialogVisible"
    title="文章内容"
    width="70%"
    @close="handleClose"
    @opened="handleOpen"
  >
    <el-form :model="form" label-width="100px" ref="formRef" :rules="rules">
      <el-form-item label="文章ID" prop="essay_id">
        <el-input disabled v-model="form.essay_id"/>
      </el-form-item>
      <el-form-item label="文章标题" prop="essay_title">
        <el-input v-model="form.essay_title"/>
      </el-form-item>
      <el-form-item label="文章作者" prop="essay_author">
        <el-input v-model="form.essay_author" type="text"/>
      </el-form-item>
      <el-form-item label="发布时间" prop="publish_at">
        <el-input disabled v-model="form.publish_at" type="text"/>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否可评论" prop="essay_isok">
            <el-cascader v-model="form.essay_isok" :options="commenttype"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收藏数" prop="essay_collect_num">
            <el-input disabled v-model="form.essay_collect_num" type="text"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文章类型" prop="essay_type">
            <el-cascader v-model="form.essay_type" :options="essaytype"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="文章内容" prop="essay_content">
        <el-input :rows="10" v-model="form.essay_content" type="textarea"/>
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
import { filterCommentEngTypeToInt, filterEssayEngTypeToInt } from '@/utils/type'
import { essaytype } from '../essaytype'
import { commenttype } from '../commenttype'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import { modifyEssay } from '@/api/essay'
const emits = defineEmits(['update:modelValue'])
const form = ref({
  essay_id: '',
  essay_title: '',
  essay_author: '',
  publish_at: '',
  essay_isok: '',
  essay_collect_num: '',
  essay_type: '',
  essay_content: ''
})

const props = defineProps({
  essay_id: String,
  essay_title: String,
  essay_author: String,
  publish_at: String,
  essay_isok: String,
  essay_collect_num: String,
  essay_type: String,
  essay_content: String
})

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleOpen = () => {
  form.value.essay_isok = props.essay_isok === '不可评论' ? 'no' : 'ok'
  form.value.essay_type = props.essay_type
  form.value.word = props.words
  form.value.essay_id = props.essay_id
  form.value.essay_title = props.essay_title
  form.value.essay_author = props.essay_author
  form.value.publish_at = props.publish_at
  form.value.essay_collect_num = props.essay_collect_num
  form.value.essay_type = props.essay_type
  form.value.essay_content = props.essay_content
}

const handleConfirm = async () => {
  console.log(form.value.essay_type[0])
  console.log(form.value.essay_isok[0])
  form.value.essay_type = filterEssayEngTypeToInt(form.value.essay_type[0])
  form.value.essay_isok = filterCommentEngTypeToInt(form.value.essay_isok[0])
  console.log(form.value.essay_type)
  console.log(form.value.essay_isok)
  await modifyEssay(form.value)
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
