<template>
  <el-dialog
    :model-value="dialogVisible"
    title="添加听力"
    width="65%"
    @close="handleClose"
  >
    <el-form :model="form" label-width="100px" ref="formRef" :rules="rules">
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
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { addListen } from '@/api/listen'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import { listentype } from '../listentype'
import { filterListenEngTypeToInt } from '@/utils/type'
const emits = defineEmits(['update:modelValue'])

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = async () => {
  form.value.listen_type = filterListenEngTypeToInt(form.value.listen_type[0])
  await addListen(form.value)
  ElMessage({
    message: i18n.global.t('message.addSuccess'),
    type: 'success'
  })
  handleClose()
  window.location.reload()
}

const formRef = ref(null)
const form = ref({
  listen_title: '',
  listen_source: '',
  listen_editor: '',
  listen_type: '',
  listen_media_path: '',
  listen_mp_3_path: '',
  listen_second_type: '',
  listen_content: ''
})

const rules = ref({
  listen_title: [
    {
      required: true,
      message: '请填写正确的听力标题',
      trigger: 'blur'
    }
  ],
  listen_source: [
    {
      required: true,
      message: '请填写正确的听力来源',
      trigger: 'blur'
    }
  ],
  listen_editor: [
    {
      required: true,
      message: '请填写正确的编辑姓名',
      trigger: 'blur'
    }
  ],
  listen_type: [
    {
      required: true,
      message: '请选择的听力类型',
      trigger: 'blur'
    }
  ],
  listen_content: [
    {
      required: true,
      message: '请填写正确的听力内容',
      trigger: 'blur'
    }
  ]
})
</script>

<style lang="scss" scoped></style>
