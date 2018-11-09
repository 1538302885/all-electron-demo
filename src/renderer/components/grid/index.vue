<template>
    <div>
        <el-table @selection-change="rowSelectedCallback" :data="config.data" stripe border>
            <el-table-column type="selection" width="55"></el-table-column>
            <template v-for="(column, index) in config.columnModel">
                <slot v-if="column.slot" :name="column.slot" :align="align"></slot>
                <el-table-column :key="index" v-if="!column.slot" :label="column.label"
                                 :prop="column.code" :align="align"></el-table-column>
            </template>
        </el-table>
        <el-pagination v-if="page.isShow" @current-change="currentPageChange" :page-size="page.pageSize"
                       :current-page="page.currentPage" :page-count="page.totalPage" :layout="page.layout" background
                       class="page">
        </el-pagination>
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
        config: {
            type: Object,
            required: true
        }
    },
    computed: mapGetters([]),
    data() {
        return {
            align: 'center',
            page: {
                isShow: false,
                currentPage: 1,
                pageSize: 10,
                totalPage: 0,
                layout: 'prev, pager, next'
            },
            multiSelected: [],
            defaultParams() {
                return {};
            }
        };
    },
    mounted() {
        if (this.config.url) {
            this.search();
        }
    },
    methods: {
        rowSelectedCallback(rows) {
            this.multiSelected = rows;
        },
        getRowsSelected() {
            return this.multiSelected;
        },
        search() {
            this.loadData(1);
        },
        loadData(page) {
            let _this = this;
            let paramsFn = _this.config['params'] || _this.defaultParams;
            let params = paramsFn();
            params['page'] = page;
            params['pageSize'] = _this.page.pageSize;
            _this.$ajax({
                url: _this.config.url,
                params: params
            }).then((response) => {
                _this.page.isShow = true;
                _this.page.totalPage = response.data.totalPage;
                _this.page.currentPage = page;
                _this.config.data = response.data.data;
            });
        },
        currentPageChange(currentPage) {
            this.loadData(currentPage);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .page {
        text-align: right;
        margin: 20px 20px 0 0;
    }
</style>
