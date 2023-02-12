<template>
  <div class="container">
    <img :src="imgSrc" alt="">
    <i class="el-icon-close" @click="closeThumbBtn"></i>
  </div>
</template>

<script>
export default {
  name: 'ThumbItem',
  props: ['imgSrc'],
  methods: {
    closeThumbBtn() {
      this.$emit('close')
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
}
.container:hover {
  border: 1px solid $actColor;
  .el-icon-close {
    color: $actColor;
  }
}
</style>