<template>
  <div class="container">
    <img :src="imgSrc" alt="" />
    <el-progress
      :stroke-width="3"
      :width="40"
      v-show="showPercentage"
      type="circle"
      :percentage="percentage"
      :format="format"
    ></el-progress>
    <el-progress
      :stroke-width="3"
      :width="40"
      v-show="showSuccess"
      type="circle"
      :percentage="percentage"
      status="success"
    ></el-progress>
    <i
      v-show="!showPercentage"
      class="el-icon-close"
      @click="closeThumbBtn"
    ></i>
  </div>
</template>

<script>
// import { delay } from '@/utils';
export default {
  name: "ThumbItem",
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    percentage: Number,
  },
  computed: {
    showPercentage() {
      if (this.percentage !== undefined && this.percentage !== 0) {
        return true;
      }
      return false;
    },
    showSuccess() {
      return this.percentage === 100 ? true : false;
    }
  },
  methods: {
    closeThumbBtn() {
      this.$emit("close");
    },
    format(percentage) {
      return percentage === 100 ? '' : `${percentage}%`;
    }
 }
}
</script>

<style scoped lang="scss">
$defColor: #ddd;
$actColor: #aaa;
.container {
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
  .el-progress {
    position: absolute;
    top: 5px;
    right: 30px;
  }
}
.container:hover {
  border: 1px solid $actColor;
  .el-icon-close {
    color: $actColor;
  }
}
</style>