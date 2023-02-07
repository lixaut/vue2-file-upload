<template>
  <Upload :title="name"></Upload>
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