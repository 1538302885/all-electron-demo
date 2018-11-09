import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCodemirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import ace from 'ace-builds';
Vue.use(ace);
Vue.use(VueCodemirror);
Vue.use(ElementUI);
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    template: '<App/>',
}).$mount('#app');
