<template>
    <div v-if="isShow">
        <div class="bar">
            <img :src="logoUrl" class="logo"/>
            <div v-for="menu in menuList" :key="menu.label" @click="menuSelect(menu)" class="menu">
                {{menu.label}}
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';
import env from '@/config/env';
import string from '@/util/string';
import common from "@/util/common";

export default {
    components: {},
    computed: mapGetters([]),
    data() {
        return {
            isShow: false,
            logoUrl: 'static/resource/img/pro/logo.png',
            menuList: [{
                label: '首页',
                path: '/home/guide/introduct'
            }, {
                label: '活动配置',
                path: '/home/activity/list'
            }, {
                label: '组件配置',
                path: '/home/cmp/list'
            }, {
                label: '属性配置',
                path: '/home/opt/list'
            }]
        };
    },
    watch: {
        '$route': 'setShow'
    },
    mounted() {
        this.setShow();
    },
    methods: {
        setShow() {
            this.isShow = window.location.hash.startsWith('#/home/');
        },
        menuSelect(menu) {
            console.log(menu);
            this.$router.push({
                path: menu.path
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bar {
        background-color: #545c64;
    }

    .logo {
        display: inline-block;
        width: 70px;
        height: 70px;
        margin: 0 0 0 20px;
        vertical-align: top;
        cursor: pointer;
    }

    .menu {
        display: inline-block;
        width: 100px;
        height: 70px;
        line-height: 70px;
        margin: 0 20px;
        padding: 0 20px;
        font-size: 20px;
        color: #ffffff;
        vertical-align: top;
        text-align: center;
        cursor: pointer;
    }

    .menu:hover {
        background-color: #434a50;
    }
</style>
