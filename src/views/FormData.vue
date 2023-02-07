<template>
  <Upload :title="name"></Upload>
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
</style>