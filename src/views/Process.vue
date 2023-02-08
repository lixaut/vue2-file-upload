<template>
  <Upload :title="name">
    <el-button type="primary">上传文件</el-button>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue'
export default {
  name: 'Process',
  components: { Upload },
  data() {
    return {
      name: '单一文件上传「进度管理」'
    }
  }
}
</script>

<style scoped lang="scss">
</style>