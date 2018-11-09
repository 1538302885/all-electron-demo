<template>
    <div>
        <img :src="attrOption.url" @error="errorHandle" :style="styleOption">
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';
import env from '@/config/env';
import string from '@/util/string';
import common from "@/util/common";

export default {
    components: {},
    props: {
        attrOption: {
            type: Object,
            default: () => {
                return {};
            }
        },
        styleOption: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    computed: mapGetters([]),
    data() {
        return {
            url: 'static/resource/img/cmp/image.png'
        };
    },
    mounted() {
    },
    methods: {
        errorHandle() {
            console.log(this.attrOption, this.styleOption);
            this.attrOption.url = this.url;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
