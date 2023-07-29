<template>
  <el-dialog
    :model-value="dialogVisible"
    title="听力内容"
    width="70%"
    @close="handleClose"
    @opened="handleOpen"
  >
    <el-form :model="form" label-width="100px" ref="formRef">
      <el-row>
        <el-col :span="12">
          <el-form-item label="听力ID" prop="listen_id">
            <el-input disabled v-model="form.listen_id"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布时间" prop="publish_at">
            <el-input disabled v-model="form.publish_at"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="听力标题" prop="listen_title">
        <el-input v-model="form.listen_title"/>
      </el-form-item>
      <el-row>
        <el-col :span="7">
          <el-form-item label="听力来源" prop="listen_source">
            <el-input v-model="form.listen_source" type="text"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="编辑" prop="listen_editor">
            <el-input v-model="form.listen_editor" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="听力类型" prop="listen_type">
            <el-cascader v-model="form.listen_type" :options="listentype"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="听力视频链接" prop="listen_media_path">
        <el-input v-model="form.listen_media_path" type="text"/>
      </el-form-item>
      <el-form-item label="听力音频链接" prop="listen_mp_3_path">
        <el-input v-model="form.listen_mp_3_path" type="text"/>
      </el-form-item>
      <el-form-item label="听力第二级类型" prop="listen_second_type">
        <el-input v-model="form.listen_second_type" type="text"/>
      </el-form-item>
      <el-form-item label="听力内容" prop="listen_content">
        <el-input v-model="form.listen_content" type="text"/>
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
import { filterListenEngTypeToInt } from '@/utils/type'
import { listentype } from '../listentype'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import { modifyListen } from '@/api/listen'
const emits = defineEmits(['update:modelValue'])
const form = ref({
  listen_id: '',
  publish_at: '',
  listen_title: '',
  listen_source: '',
  listen_editor: '',
  listen_type: '',
  listen_media_path: '',
  listen_mp_3_path: '',
  listen_second_type: '',
  listen_content: ''
})

const props = defineProps({
  listen_id: String,
  publish_at: String,
  listen_title: String,
  listen_source: String,
  listen_editor: String,
  listen_type: String,
  listen_media_path: String,
  listen_mp_3_path: String,
  listen_second_type: String,
  listen_content: String
})

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleOpen = () => {
  form.value.listen_id = props.listen_id
  form.value.publish_at = props.publish_at
  form.value.listen_title = props.listen_title
  form.value.listen_source = props.listen_source
  form.value.listen_editor = props.listen_editor
  form.value.listen_type = props.listen_type
  form.value.listen_media_path = props.listen_media_path
  form.value.listen_mp_3_path = props.listen_mp_3_path
  form.value.listen_second_type = props.listen_second_type
  form.value.listen_content = props.listen_content
}

const handleConfirm = async () => {
  form.value.listen_type = filterListenEngTypeToInt(form.value.listen_type[0])
  await modifyListen(form.value)
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
