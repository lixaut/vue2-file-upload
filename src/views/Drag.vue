<template>
  <Upload :title="name">
    <div class="dragArea">
      <i class="el-icon-folder-add"></i>
    </div>
  </Upload>
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
.dragArea {
  i {
    font-size: 50px;
    color: #aaa;
  }
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>