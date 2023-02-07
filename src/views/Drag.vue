<template>
  <Upload :title="name"></Upload>
</template>

<script>
import Upload from '@/components/Upload.vue'
export default {
  name: 'Drag',
  components: { Upload },
  data() {
    return {
      name: '拖拽上传'
    }
  }
}
</script>

<style scoped lang="scss">
</style>