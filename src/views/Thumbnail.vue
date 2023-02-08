<template>
  <Upload :title="name">
    <el-button type="primary">选择文件</el-button>
    <el-button type="success">上传到服务器</el-button>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue'
export default {
  name: 'Thumbnail',
  components: { Upload },
  data() {
    return {
      name: '单一文件上传「缩略图处理」'
    }
  }
}
</script>

<style scoped lang="scss">
</style>