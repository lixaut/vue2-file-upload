<template>
  <Upload :title="name">
    <input type="file" style="display:none" multiple ref="inpBtnRef">
    <el-button type="primary" icon="el-icon-folder-opened" :disabled="isLoading" @click="selectFile">选择文件</el-button>
    <el-button type="success" icon="el-icon-upload" :loading="isLoading" @click="uploadBtn">上传到服务器</el-button>
    <div class="info">
      <span v-if="showTip">只能上传 PNG/JPG/JPEG 格式图片，且大小不能超过2MB</span>
      <div class="fileList" v-else>
        <ThumbItem
          v-for="file in fileList"
          :key="file.id"
          :imgSrc="file.base64"
          @close="closeFile(file.id)"
          :percentage="file.percentage"
        ></ThumbItem>
      </div>
    </div>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue';
import ThumbItem from '@/components/ThumbItem.vue';
import { changeToBase64, delay } from '@/utils';
import { reqProgress } from '@/api';
export default {
  name: 'MultiFiles',
  components: { Upload, ThumbItem },
  data() {
    return {
      name: '多文件上传',
      isLoading: false,
      showTip: true,
      fileList: []
    }
  },
  mounted() {
    this.inpAddListener();
  },
  methods: {
    selectFile() {
      this.$refs.inpBtnRef.click();
    },
    // 文件输入监听
    inpAddListener() {
      const that = this;
      this.$refs.inpBtnRef.addEventListener('change', function() {
        let files = Array.from(this.files);
        let queue = files.map(async (file) => {
          let base64 = await changeToBase64(file),
            id = file.lastModified,
            percentage = 0;
          return { id, file, base64, percentage };
        })
        Promise.all(queue).then(fileArr => {
          that.fileList = fileArr;
          that.showTip = false;
        })
      })
    },
    // 关闭缩略图回调
    closeFile(id) {
      this.fileList = this.fileList.filter(item => item.id !== id);
      if (this.fileList.length ===0 ) {
        this.isLoading = false;
      }
    },
    // 文件上传回调
    uploadBtn() {
      if (this.fileList.length === 0) {
        this.$message({
          message: '未选择文件，请先选择需要上传的文件！',
          type: 'warning'
        })
      }
      this.isLoading = true;
      this.fileList.forEach(async fileItem => {
        let data = {
          file: fileItem.file,
          fileName: fileItem.file.name,
          func: this.progressCb(fileItem.id)
        };
        try {
          let res = await reqProgress(data);
          if (res.code === 0) {
            this.$message({
              message: `文件 ${fileItem.file.name} 上传成功！`,
              type: 'success'
            });
            await delay(300);
            this.closeFile(fileItem.id);
            return;
          }
          throw res.codeText;
        } catch (err) {
          this.$message({
            message: `文件 ${fileItem.file.name} 上传失败，请稍后重试！`,
            type: 'error'
          });
          console.log(err);
        }
      });
    },
    // 上传进度回调
    progressCb(id) {
      return e => {
        let percentage = Math.floor(e.progress * 100);
        this.fileList = this.fileList.map(item => {
          if (item.id === id) {
            return { ...item, percentage };
          }
          return item;
        });
      };
    }
  },
}
</script>

<style scoped lang="scss">
.info {
  span {
    font-size: 12px;
    color: #aaa;
  }
}
</style>