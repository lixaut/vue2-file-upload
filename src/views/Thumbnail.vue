<template>
  <Upload :title="name"></Upload>
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