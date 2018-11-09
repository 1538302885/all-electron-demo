<template>
    <div class="wrap">
        <div class="head">V1.0.0功能</div>
        <div class="text">用户可以拖拉拽组件组合生成外部能够访问的页面</div>
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
        return {};
    },
    mounted() {
        let self = this;
    },
    methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wrap {
        margin: 0 20px;
    }

    .head {
        margin-top: 20px;
        font-size: 16px;
    }

    .text {
        margin-top: 10px;
        font-size: 12px;
    }
</style>
