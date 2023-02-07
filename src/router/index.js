
import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由组件
import FormData from '@/views/FormData.vue'
import Base64 from '@/views/Base64.vue'
import Thumbnail from '@/views/Thumbnail.vue'
import Process from '@/views/Process.vue'
import MultiFiles from '@/views/MultiFiles.vue'
import Drag from '@/views/Drag.vue'
import BigFile from '@/views/BigFile.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/formData', component: FormData },
  { path: '/base64', component: Base64 },
  { path: '/thumbnail', component: Thumbnail },
  { path: '/process', component: Process },
  { path: '/multiFiles', component: MultiFiles },
  { path: '/drag', component: Drag },
  { path: '/bigFile', component: BigFile }
]

export default new VueRouter({
  routes
})