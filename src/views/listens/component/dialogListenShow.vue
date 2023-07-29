<template>
  <el-dialog
    :model-value="dialogVisible"
    title="听力内容"
    width="70%"
    @close="handleClose"
    @opened="handleOpen"
  >
    <el-form :model="form" label-width="100px" ref="formRef">
      <el-form-item label="听力标题" prop="listen_title">
        <el-input disabled v-model="form.listen_title"/>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发布时间" prop="publish_at">
            <el-input disabled v-model="form.publish_at"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="听力收藏数" prop="listen_collect_num">
            <el-input disabled v-model="form.listen_collect_num"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="听力来源" prop="listen_source">
            <el-input disabled v-model="form.listen_source" type="text"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="编辑" prop="listen_editor">
            <el-input disabled v-model="form.listen_editor" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="听力类型" prop="listen_type">
            <el-input disabled v-model="form.listen_type" type="text"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="听力视频链接" prop="listen_media_path">
        <el-input disabled v-model="form.listen_media_path" type="text"/>
      </el-form-item>
      <el-form-item label="听力音频链接" prop="listen_mp_3_path">
        <el-input disabled v-model="form.listen_mp_3_path" type="text"/>
      </el-form-item>
      <el-form-item label="听力第二级类型" prop="listen_second_type">
        <el-input disabled v-model="form.listen_second_type" type="text"/>
      </el-form-item>
      <el-form-item label="听力内容" prop="listen_content">
        <el-input disabled v-model="form.listen_content" type="text"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
const emits = defineEmits(['update:modelValue'])
const form = ref({
  publish_at: '',
  listen_collect_num: '',
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
  publish_at: String,
  listen_collect_num: String,
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
  form.value.publish_at = props.publish_at
  form.value.listen_collect_num = props.listen_collect_num
  form.value.listen_title = props.listen_title
  form.value.listen_source = props.listen_source
  form.value.listen_editor = props.listen_editor
  form.value.listen_type = props.listen_type
  form.value.listen_media_path = props.listen_media_path
  form.value.listen_mp_3_path = props.listen_mp_3_path
  form.value.listen_second_type = props.listen_second_type
  form.value.listen_content = props.listen_content
}

const formRef = ref(null)
</script>

<style lang="scss" scoped></style>
