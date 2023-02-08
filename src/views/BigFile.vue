<template>
  <Upload :title="name">
    <el-button type="primary">上传文件</el-button>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue'
export default {
  name: 'BigFile',
  components: { Upload },
  data() {
    return {
      name: '大文件上传'
    }
  }
}
</script>

<style scoped lang="scss">
</style>