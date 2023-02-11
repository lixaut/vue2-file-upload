<template>
  <Upload :title="name">
    <input type="file" style="display:none" ref="inpBtnRef">
    <el-button :loading="showProgress" type="primary" @click="uploadFile">上传文件</el-button>
    <div class="progress" v-show="showProgress">
      <el-progress v-if="successTip" :percentage="progress" :format="format"></el-progress>
      <el-progress v-else :percentage="progress" :format="format" status="success"></el-progress>
      <span class="rate">{{rate}} KB/s</span>
    </div>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue';
import { reqProgress } from '@/api';
import { delay } from '@/utils'
export default {
  name: 'Progress',
  components: { Upload },
  data() {
    return {
      name: '单一文件上传「进度管理」',
      progress: 0,
      showProgress: false,
      successTip: true,
      rate: 0
    }
  },
  watch: {
    progress: async function(val) {
      if (val === 100) {
        await delay(300);
        this.successTip = false;
      }
    }
  },
  mounted() {
    this.inpAddListener();
  },
  methods: {
    // 进度条文字显示
    format(percentage) {
      let inNum = Math.floor(percentage);
      return `${inNum}%`;
    },
    // 文件选择监听
    inpAddListener() {
      let that = this;
      this.$refs.inpBtnRef.addEventListener('change', async function() {
        let file = this.files[0];
        if (!file) return;
        that.showProgress = true;
        let data = {
          file,
          fileName: file.name,
          func: that.progressCb,
        };
        try {
          const res = await reqProgress(data);
          if (res.code === 0) {
            that.$message({
              message: '文件上传成功！',
              type: 'success'
            });
            return;
          }
          throw res.codeText;
        } catch (err) {
          that.$message({
            message: '文件上传失败，请稍后再试！',
            type: 'error'
          });
          console.log(err);
        } finally {
          await delay(600);
          that.showProgress = false;
          that.progress = 0;
          that.successTip = true;
          that.rate = 0;
        }
      });
    },
    // 触发文件输入inp
    uploadFile() {
      this.$refs.inpBtnRef.click();
    },
    // 上传进度回调
    progressCb(ev) {
      this.progress = ev.progress * 100;
      this.rate = ev.rate ? (ev.rate / 1024).toFixed(2): this.rate ;
    }
  },
}
</script>

<style scoped lang="scss">
.progress {
  padding: 10px 0;
  .rate {
    font-size: 12px;
  }
}
</style>