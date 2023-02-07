<template>
  <div id="app">
    <el-container class="container">
      <!-- 头部标题 -->
      <el-header>文件上传的多种方式</el-header>
      <el-container>
        <!-- 侧边导航栏 -->
        <el-aside>
          <el-menu default-active="1">
            <el-menu-item v-for="item in menuData" :key="item.id" :index="item.id" @click="goPath(item.path)">
              <i class="el-icon-upload"></i>
              <span>{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主内容区 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import router from './router'

export default {
  name: 'App',
  data() {
    return {
      menuData: [
        { id: '1', name: 'Form-Data', path: '/formData' },
        { id: '2', name: 'Base64', path: '/base64' },
        { id: '3', name: '缩略图处理', path: '/thumbnail' },
        { id: '4', name: '进度管控', path: '/process' },
        { id: '5', name: '多文件上传', path: '/multiFiles' },
        { id: '6', name: '拖拽上传', path: '/drag' },
        { id: '7', name: '大文件上传', path: '/bigFile' }
      ]
    }
  },
  methods: {
    goPath(path) {
      router.push(path)
    }
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
