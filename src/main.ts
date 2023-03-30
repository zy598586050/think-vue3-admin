import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/theme/index.scss'
import { i18n } from '@/i18n'
import mitt from 'mitt'
import router from './router'
import pinia from '@/store'
import other from '@/utils/other'
import { directive } from '@/utils/directive'
import { getUpFileUrl, handleTree, parseTime, selectDictLabel } from '@/utils/thinkvue3'
import { getItems, setItems, getOptionValue, isEmpty } from '@/api/items'
import { useDict } from '@/api/system/dict/data'

// @ts-ignore
import VueGridLayout from 'vue-grid-layout'
// 大文件上传组件
// @ts-ignore
import uploader from 'vue-simple-uploader'
// 分页组件
import pagination from '@/components/pagination/index.vue'

const app = createApp(App)

directive(app)
other.elSvg(app)
app.component('pagination', pagination)
// @ts-ignore
app.use(ElementPlus, { i18n: i18n.global.t })
.use(router)
.use(pinia)
.use(i18n)
.use(VueGridLayout)
.use(uploader)
.mount('#app')

app.config.globalProperties.getUpFileUrl = getUpFileUrl
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.parseTime = parseTime

app.config.globalProperties.getItems = getItems
app.config.globalProperties.setItems = setItems
app.config.globalProperties.getOptionValue = getOptionValue
app.config.globalProperties.isEmpty = isEmpty
app.config.globalProperties.useDict = useDict

const globalProperties={
    mittBus: mitt(),
    i18n
}

//必须合并vue默认的变量，否则有问题
app.config.globalProperties = Object.assign(
    app.config.globalProperties,
    globalProperties
)
