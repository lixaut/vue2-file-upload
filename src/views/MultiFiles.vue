<template>
  <Upload :title="name">
    <el-button type="primary">选择文件</el-button>
    <el-button type="success">上传到服务器</el-button>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue'
export default {
  name: 'MultiFiles',
  components: { Upload },
  data() {
    return {
      name: '多文件上传'
    }
  }
}
</script>

<style scoped lang="scss">
</style>