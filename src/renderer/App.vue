<template>
    <div id="app">
        <cmp-head></cmp-head>
        <router-view></router-view>
    </div>
</template>

<script>
import cmpHead from '@/components/head/index';
export default {
    components: {
        cmpHead
    },
    data() {
        return {};
    },
    mounted() {
    },
    methods: {}
}
</script>

<style>
    @import 'assets/style/reset.css';
    @import 'assets/style/common.css';

    #app {
        width: 1200px;
        margin: 0 auto;
    }
</style>
