<template>
  <div id="app">
    <el-container class="container">
      <!-- 头部标题 -->
      <el-header>文件上传的多种方式</el-header>
      <el-container>
        <!-- 侧边导航栏 -->
        <el-aside>
          <el-menu>
            <el-menu-item index="1">
              <i class="el-icon-upload"></i>
              <span>方式1</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-upload"></i>
              <span>方式2</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-upload"></i>
              <span>方式3</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主内容区 -->
        <el-main>main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  .container {
    height: 100vh;
    .el-header {
      font-size: 24px;
      text-align: center;
      line-height: 60px;
      background-color: #eee;
    }
    .el-container {
      .el-aside {
        border-right: 2px dashed #eee;
        .el-menu {
          border-right: none;
        }
      }
      .el-main {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
