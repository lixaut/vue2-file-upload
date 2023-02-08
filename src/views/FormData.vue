<template>
  <Upload :title="name">
    <el-button type="primary">选择文件</el-button>
    <el-button type="success">上传到服务器</el-button>
    <div class="info">
      <span>只能上传 PNG/JPG/JPEG 格式图片，且大小不能超过2MB</span>
    </div>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue'
export default {
  name: 'FormData',
  components: { Upload },
  data() {
    return {
      name: '单一文件上传「FormData」'
    }
  }
}
</script>

<style scoped lang="scss">
.info {
  span {
    font-size: 12px;
    color: #aaa;
  }
}
</style>