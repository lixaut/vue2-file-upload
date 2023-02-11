import Vue from 'vue'
import App from './App.vue'

// 引入 element-ui
import { 
  Container,
  Header,
  Aside,
  Main,
  MenuItem,
  Menu,
  Button,
  Message,
  Tag,
  Progress
} from 'element-ui'
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Tag)
Vue.use(Progress)
Vue.prototype.$message = Message

// 引入 router
import router from '@/router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
