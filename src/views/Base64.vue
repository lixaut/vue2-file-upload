<template>
  <Upload :title="name"></Upload>
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

<style>

</style>