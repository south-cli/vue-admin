import { createApp, App } from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import Page from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import 'normalize.css'
import 'element-plus/dist/index.css'
import 'vxe-table/lib/style.css'

function useTable (app: App) {
  app.use(VXETable)

  // 给 vue 实例挂载内部对象，例如：
  // app.config.globalProperties.$XModal = VXETable.modal
  // app.config.globalProperties.$XPrint = VXETable.print
  // app.config.globalProperties.$XSaveFile = VXETable.saveFile
  // app.config.globalProperties.$XReadFile = VXETable.readFile
}

createApp(Page).use(useTable).use(store).use(router).mount('#app')
