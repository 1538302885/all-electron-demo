import Vue from 'vue';
import Router from 'vue-router';
import paneEditor from '@/entry/pane/editor';
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            name: 'paneEditor',
            component: paneEditor
        },
        {
            path: '*',
            redirect: '/'
        },
    ],
});
