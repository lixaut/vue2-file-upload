<template>
  <div class="main-container">
    <h3>{{title}}</h3>
    <div class="body">
      <slot></slot>
    </div>
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .body {
    height: 240px;
    border: 1px dashed #333;
    padding: 10px;
  }
}
</style>