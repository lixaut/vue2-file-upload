<template>
  <Upload :title="name">
    <input ref="selectInpRef" type="file" style="display:none">
    <el-button icon="el-icon-folder-opened" type="primary" @click="selectFile" :disabled="loadState">选择文件</el-button>
    <el-button icon="el-icon-upload" type="success" @click="uploadFile" :loading="loadState">上传文件</el-button>
    <div class="info">
      <span v-if="showTip">只能上传 PNG/JPG/JPEG 格式图片，且大小不能超过2MB</span>
      <div v-else class="fileList">
        <el-tag @close="closeTag" closable>{{fileName}}</el-tag>
      </div>
    </div>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue';
import { reqFormdata } from '@/api';
import { isSuitable } from '@/utils';
export default {
  name: 'FormData',
  components: { Upload },
  data() {
    return {
      name: '单一文件上传「FormData」',
      loadState: false,
      showTip: true,
      fileName: '',
      file: null
    }
  },
  mounted() {
    // 监听文件选择
    this.fileListener();
  },
  methods: {
    // 监听用户选择文件操作
    fileListener() {
      const that = this;
      that.$refs.selectInpRef.addEventListener('change', function() {
        let _file = this.files[0];
        if (!isSuitable(_file, that)) return;
        that.file = _file;
        that.fileName = _file.name;
        that.showTip = false;
      });
    },
    // 选择文件按钮触发函数
    selectFile() {
      this.$refs.selectInpRef.click();
    },
    // 删除文件
    closeTag() {
      this.showTip = true;
      this.file = null;
      this.fileName = '';
    },
    // 上传文件
    uploadFile() {
      if (!this.file) {
        this.$message({
          message: '未选择文件，请先选择文件！',
          type: 'warning'
        })
        return
      }
      this.loadState = true
      let data = {
        file: this.file,
        fileName: this.file.name
      }
      reqFormdata(data)
        .then(res => {
          if (res.code === 0) {
            this.$message({
              message: '文件上传成功！',
              type: 'success'
            })
            return
          }
          return Promise.reject(res.codeText)
        })
        .catch(reason => {
          this.$message({
            message: '文件上传失败，请稍后再试！',
            type: 'error'
          })
          console.log(reason)
        })
        .finally(() => {
          this.fileName = ''
          this.file = null
          this.showTip = true
          this.loadState = false
        })
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
  .fileList {
    padding: 10px 0;
  }
}
</style>