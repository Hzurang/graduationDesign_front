<template>
  <el-dialog
    :model-value="dialogVisible"
    title="文章内容"
    width="70%"
    @close="handleClose"
    @opened="handleOpen"
  >
    <el-form :model="form" label-width="100px" ref="formRef">
        <el-form-item label="文章标题" prop="essay_title">
          <el-input disabled v-model="form.essay_title"/>
        </el-form-item>
        <el-form-item label="文章作者" prop="essay_author">
          <el-input disabled v-model="form.essay_author" type="text"/>
        </el-form-item>
        <el-form-item label="发布时间" prop="publish_at">
          <el-input disabled v-model="form.publish_at" type="text"/>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否可评论" prop="essay_isok">
              <el-input disabled v-model="form.essay_isok"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收藏数" prop="essay_collect_num">
              <el-input disabled v-model="form.essay_collect_num" type="text"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文章类型" prop="essay_type">
              <el-input disabled v-model="form.essay_type" type="text"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文章内容" prop="essay_content">
          <el-input :rows="10" disabled v-model="form.essay_content" type="textarea"/>
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
  essay_title: '',
  essay_author: '',
  publish_at: '',
  essay_isok: '',
  essay_collect_num: '',
  essay_type: '',
  essay_content: ''
})

const props = defineProps({
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
  form.value.essay_title = props.essay_title
  form.value.essay_author = props.essay_author
  form.value.publish_at = props.publish_at
  form.value.essay_isok = props.essay_isok
  form.value.essay_collect_num = props.essay_collect_num
  form.value.essay_type = props.essay_type
  form.value.essay_content = props.essay_content
}

const formRef = ref(null)
</script>

<style lang="scss" scoped></style>
