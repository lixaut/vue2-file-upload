<template>
  <Upload :title="name">
    <input ref="selectInpRef" type="file" style="display:none">
    <el-button icon="el-icon-folder-opened" type="primary" @click="selectFile" :disabled="loadState">选择文件</el-button>
    <el-button icon="el-icon-upload" type="success" @click="uploadFile" :loading="loadState">上传文件</el-button>
    <div class="info">
      <span v-if="showTip">只能上传 PNG/JPG/JPEG 格式图片，且大小不能超过2MB</span>
      <div v-else class="thumbnail">
        <img :src="base64" alt="">
        <i class="el-icon-close" @click="closeThumbBtn"></i>
      </div>
    </div>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue';
import { reqFormdata } from '@/api';
export default {
  name: 'Thumbnail',
  components: { Upload },
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
      let data = {
        file: this.file,
        fileName: this.file.name
      };
      try {
        const res = await reqFormdata(data);
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
    // 转换格式为 BASE64
    changeToBase64(file) {
      return new Promise(resolve => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function() {
          resolve(this.result);
        };
      });
    },
    // inp 按钮监听
    inpAddListener() {
      const that = this;
      this.$refs.selectInpRef.addEventListener('change', async function() {
        let _file = this.files[0];
        if (!_file) return;
        // 限制文件上传的格式
        if (!/(PNG|JPG|JPEG)/i.test(_file.type)) {
          that.$message({
            message: '不支持该文件格式，请重新选择！',
            type: 'warning'
          });
          return;
        }
        // 限制文件上传的大小
        if (_file.size > 2 * 1024 * 1024) {
          that.$message({
            message: '文件超出大小限制，请重新选择！',
            type: 'warning'
          });
          return;
        }
        that.file = _file;
        that.base64 = await that.changeToBase64(_file);
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
  $defColor: #ddd;
  $actColor: #aaa;
  .thumbnail {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border: 1px solid $defColor;
    border-radius: 10px;
    position: relative;
    .el-icon-close {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 14px;
      color: $defColor;
      cursor: pointer;
    }
    img {
      width: 44px;
      height: 44px;
      margin: 3px;
      border-radius: 10px;
    }
  }
  .thumbnail:hover {
    border: 1px solid $actColor;
    .el-icon-close {
      color: $actColor;
    }
  }
}
</style>