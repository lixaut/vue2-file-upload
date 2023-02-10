<template>
  <Upload :title="name">
    <input ref="fileInpRef" type="file" style="display:none">
    <el-button type="primary" @click="uploadBtn" :loading="loading" icon="el-icon-upload">上传图片</el-button>
    <div class="info">
      <span>只能上传 JPG/PNG 格式图片，且大小不能超过2MB</span>
    </div>
  </Upload>
</template>

<script>
import Upload from '@/components/Upload.vue';
import { reqUrlencoded } from '@/api';
import { isSuitable, changeToBase64 } from '@/utils'
export default {
  name: 'Base64',
  components: { Upload },
  data() {
    return {
      name: '单一文件上传「base64」，只适合图片',
      loading: false
    }
  },
  mounted() {
    this.fileListener();
  },
  methods: {
    // 上传按钮
    uploadBtn() {
      this.$refs.fileInpRef.click();
    },
    // 选择文件操作监听
    fileListener() {
      let that = this;
      this.$refs.fileInpRef.addEventListener('change', async function() {
        let file = this.files[0];
        // 判断文件是否合适
        if (!isSuitable(file, that)) return;
        // 文件转码
        const BASE64 = await changeToBase64(file);
        // 上传状态
        that.loading = true;
        // 文件上传
        let data = {
          file: encodeURIComponent(BASE64),
          fileName: file.name
        };
        try {
          const res = await reqUrlencoded(data);
          if (res.code === 0) {
            that.$message({
              message: '文件上传成功！',
              type: 'success'
            });
            return;
          }
          throw res.codeText;
        } catch (err) {
          console.log(err);
          that.$message({
            message: '文件上传失败，请您稍后再试！',
            type: 'error'
          });
        } finally {
          that.loading = false;
        }
      })
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