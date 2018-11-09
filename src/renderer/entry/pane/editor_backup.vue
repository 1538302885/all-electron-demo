<template>
    <div class="body">
        <el-tabs v-model="activeTab" @tab-click="tabClick" type="border-card">
            <el-tab-pane label="快速登录" name="login">
                <el-form label-width="80px" :model="user">
                    <el-form-item label="账号">
                        <el-input v-model="user.acc" placeholder="请输入账号" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="user.psw" placeholder="请输入密码" clearable></el-input>
                    </el-form-item>
                    <div class="btn-group">
                        <el-button @click="login_tmp" type="primary" size="small">登录</el-button>
                        <el-button @click="reset" type="primary" size="small">重置</el-button>
                    </div>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="快速注册" name="register"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';
import env from '@/config/env';
import string from '@/util/string';
import common from '@/util/common';

export default {
    components: {},
    data() {
        return {
            activeTab: 'login_tmp',
            user: {
                acc: 'admin',
                psw: 'admin'
            }
        };
    },
    mounted() {
        let self = this;
    },
    methods: {
        tabClick(tab, event) {
        },
        login() {
            this.$router.push({
                path: '/home/guide/introduct'
            });
        },
        reset() {
            this.user = {
                acc: 'admin',
                psw: 'admin'
            };
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .body {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 360px;
        height: 400px;
        margin: -200px 0 0 -180px;
    }

    .btn-group {
        text-align: center;
    }
</style>
