<template>
  <Upload :title="name">
    <el-button type="primary">上传图片</el-button>
    <div class="info">
      <span>只能上传 JPG/PNG 格式图片，且大小不能超过2MB</span>
    </div>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue'
export default {
  name: 'Base64',
  components: { Upload },
  data() {
    return {
      name: '单一文件上传「base64」，只适合图片'
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