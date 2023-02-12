<template>
  <Upload :title="name">
    <div ref="dragAreaRef" class="dragArea">
      <i v-if="!showLoading" class="el-icon-folder-add"></i>
      <div v-else class="mark">
        <i class="el-icon-loading icon"></i>
        <span class="title">文件上传中...</span>
      </div>
    </div>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue';
import { reqFormdata } from '@/api';
export default {
  name: 'Drag',
  components: { Upload },
  data() {
    return {
      name: '拖拽上传',
      showLoading: false
    }
  },
  mounted() {
    this.addListener();
  },
  methods: {
    addListener() {
      let dragA = this.$refs.dragAreaRef,
        that = this;
      dragA.addEventListener('drop', async function(e) {
        // 组织浏览器默认行为
        e.preventDefault();
        let file = e.dataTransfer.files[0];
        if (!file) return;
        that.showLoading = true;
        let data = {
          file,
          fileName: file.name
        };
        try {
          const res = await reqFormdata(data);
          if (res.code === 0) {
            that.$message({
              message: '文件上传成功！',
              type: 'success'
            });
            return;
          }
          throw res.codeText;
        } catch (err) {
          this.$message({
            message: '文件上传失败，请稍后再试！',
            type: 'error'
          });
          console.log(err);
        } finally {
          that.showLoading = false;
          this.style['background-color'] = '#fff';
        }
      });
      dragA.addEventListener('dragover', function(e) {
        // 组织浏览器默认行为
        e.preventDefault();
      });
      dragA.addEventListener('dragenter', function() {
        this.style['background-color'] = '#eee';
      });
      dragA.addEventListener('dragleave', function() {
        this.style['background-color'] = '#fff';
      });
    }
  },
}
</script>

<style scoped lang="scss">
.dragArea {
  i {
    font-size: 50px;
    color: #aaa;
  }
  .mark {
    width: 100%;
    height: 100%;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      font-size: 24px;
      color: #aaa;
    }
    .title {
      margin-left: 5px;
      font-size: 20px;
      color: #aaa;
    }
  }
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>