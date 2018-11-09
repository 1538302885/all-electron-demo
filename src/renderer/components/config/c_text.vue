<template>
    <div :style="styleOption">
        {{attrOption.text || '文本'}}
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
        return {};
    },
    mounted() {
        console.log(this.styleOption);
    },
    methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
