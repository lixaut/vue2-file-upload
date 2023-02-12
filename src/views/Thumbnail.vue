<template>
  <Upload :title="name">
    <input ref="selectInpRef" type="file" style="display:none">
    <el-button icon="el-icon-folder-opened" type="primary" @click="selectFile" :disabled="loadState">选择文件</el-button>
    <el-button icon="el-icon-upload" type="success" @click="uploadFile" :loading="loadState">上传文件</el-button>
    <div class="info">
      <span v-if="showTip">只能上传 PNG/JPG/JPEG 格式图片，且大小不能超过2MB</span>
      <ThumbItem v-else :imgSrc="base64"></ThumbItem>
    </div>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue';
import ThumbItem from '@/components/ThumbItem.vue';
import { reqUploadHash } from '@/api';
import { isSuitable, changeToBase64, changeToHash } from '@/utils';
export default {
  name: 'Thumbnail',
  components: { Upload, ThumbItem },
  data() {
    return {
      name: '单一文件上传「缩略图处理」',
      loadState: false,
      showTip: true,
      base64: '',
      file: null
    }
  },
  mounted() {
    this.inpAddListener();
  },
  methods: {
    // 选择文件回调
    selectFile() {
      this.$refs.selectInpRef.click();
    },
    // 上传文件回调
    async uploadFile() {
      if (!this.file) {
        this.$message({
          message: '未选择文件，请先选择文件！',
          type: 'warning'
        });
        return;
      }
      this.loadState = true;
      let { fileName } = await changeToHash(this.file)
      let data = {
        file: encodeURIComponent(this.base64),
        fileName,
        fileOriName: this.file.name
      };
      try {
        const res = await reqUploadHash(data);
        if (res.code === 0) {
          this.$message({
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
        this.loadState = false;
        this.closeThumbBtn();
      }
    },
    // inp 按钮监听
    inpAddListener() {
      const that = this;
      this.$refs.selectInpRef.addEventListener('change', async function() {
        let _file = this.files[0];
        // 检查文件 格式 & 大小
        if (!isSuitable(_file, that)) return;
        that.file = _file;
        that.base64 = await changeToBase64(_file);
        that.showTip = false;
      });
    },
    // 关闭缩略图按钮回调
    closeThumbBtn() {
      this.file = null;
      this.base64 = '';
      this.showTip = true;
    }
  },
}
</script>

<style scoped lang="scss">
.info {
  span {
    font-size: 12px;
    color: #aaa
  }
}
</style>