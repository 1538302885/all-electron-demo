// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
window.console = window.console || function () {
};
import Vue from 'vue';
import App from './App';
import router from './router';
import 'babel-polyfill';
import 'es6-promise/auto';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex/store';
import VueCodemirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import ace from 'ace-builds';
import VueElectron from 'vue-electron'
import env from './config/env';
import request from '@/util/request';

Vue.use(ace);
Vue.use(VueCodemirror);
Vue.use(ElementUI);
Vue.use(VueElectron);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store: store,
    router,
    template: '<App/>',
    components: {App}
});
