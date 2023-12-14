import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
// 导入less
import "icepro/dist/style.css";

import icepro from "icepro/dist/icepro.js";
import './assets/css/reset.less'
import './assets/css/common.less'
import tag from '@/components/common/tag/index.vue'

const app = createApp(App);

app.component("icePagination", icepro.components.icePagination);
app.component("tag", tag);


icepro.install(app);

app
    .use(router)
    .mount('#app')
