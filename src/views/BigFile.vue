<template>
  <Upload :title="name">
    <input ref="fileInpRef" type="file" style="display:none">
    <el-button type="primary" @click="uploadFile" icon="el-icon-upload" :loading="loading">上传文件</el-button>
    <div class="progress" v-show="showProgress">
      <el-progress v-if="!showSuccess" :percentage="percentage" :format="format"></el-progress>
      <el-progress v-else :percentage="percentage" status="success"></el-progress>
    </div>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue';
import { fileSlice, changeToHash, delay, changeToBase64 } from '@/utils';
import { reqAlreadyUpload, reqSliceMerge, reqSliceUpload } from '@/api';
export default {
  name: 'BigFile',
  components: { Upload },
  data() {
    return {
      name: '大文件上传',
      showProgress: false,
      showSuccess: false,
      percentage: 0,
      index: 0,
      loading: false
    }
  },
  mounted() {
    this.fileListener();
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? '' : `${percentage}%`;
    },
    uploadFile() {
      this.$refs.fileInpRef.click();
    },
    async complete(count, HASH) {
      this.index += 1;
      this.percentage = Math.ceil(this.index / count) * 100;
      if (this.index < count) return;
      try {
        let data = {
          HASH,
          count
        }
        let res = await reqSliceMerge(data);
        if (res.code === 0) {
          this.showSuccess = true;
          await delay(300);
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
        this.showProgress = false;
        this.percentage = 0;
        this.index = 0;
        this.loading = false;
      }
    },
    fileListener() {
      let that = this;
      this.$refs.fileInpRef.addEventListener('change', async function() {
        let file = this.files[0],
          chunks = [],
          already = [];
        if (!file) {
          console.log('文件不在');
          return;
        }
        let { HASH, suffix } = await changeToHash(file);
        // ui
        that.showProgress = true;
        that.loading = true;
        // 文件切片
        chunks = fileSlice(file, HASH, suffix);
        // 获取已上传文件
        try {
          let params = { HASH };
          let res = await reqAlreadyUpload(params);
          if (res.code === 0) {
            already = res.fileList;
          }
        } catch (err) {
          console.log(err);
        }
        // 切片上传
        chunks.forEach(async item => {
          // 已上传的不用再上传
          if (already.length > 0 && already.includes(item.fileName)) {
            that.complete(chunks.length, HASH);
            return;
          }
          let base64 = await changeToBase64(item.file);
          let data = {
            file: encodeURIComponent(base64),
            fileName: item.fileName
          };
          try {
            const res = await reqSliceUpload(data);
            if (res.code === 0) {
              that.complete(chunks.length, HASH);
              return;
            }
            throw res.codeText;
          } catch (err) {
            that.$message({
              message: '文件上传失败，请您稍后再试！',
              type: 'error'
            });
            console.log(err);
          }
        });
      });
    }
  },
}
</script>

<style scoped lang="scss">
.progress {
  margin-top: 5px;
}
</style>