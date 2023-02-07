<template>
  <div class="main-container">
    <h3>{{title}}</h3>
    <div class="body"></div>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  props: ['title']
}
</script>

<style scoped lang="scss">
.main-container {
  width: 500px;
  height: 300px;
  // background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .body {
    height: 240px;
    border: 1px dashed #333;
  }
}
</style>