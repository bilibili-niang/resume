import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
// 导入less
import "icepro/dist/style.css";
import icepro from "icepro/dist/icepro.js";
import './assets/css/reset.less'
import './assets/css/common.less'
import tag from '@/components/common/tag/index.vue'
import pinia from '@/store'
import introduceMyself from '@/components/resume/introduceMyself/index.vue'
import educationalExperience from '@/components/resume/educationalExperience/index.vue'
import skill from '@/components/resume/skill/index.vue'

const app = createApp(App);
app.component("icePagination", icepro.components.icePagination);
app.component("tag", tag);
app.component("introduceMyself", introduceMyself);
app.component("educationalExperience", educationalExperience);
app.component("skill", skill);


icepro.install(app);

app.use(pinia)
    .use(router)
    .mount('#app')
