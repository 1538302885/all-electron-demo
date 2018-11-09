<template>
    <div class="container">
        <el-form :inline="true" :model="params" class="form">
            <el-form-item label="属性代码">
                <el-input v-model="params.code" placeholder="请填写属性代码"></el-input>
            </el-form-item>
            <el-form-item label="属性名称">
                <el-input v-model="params.name" placeholder="请填写属性名称"></el-input>
            </el-form-item>
            <el-form-item label="属性值">
                <el-input v-model="params.val" placeholder="请填写属性值"></el-input>
            </el-form-item>
            <el-form-item label="属性类型">
                <el-select v-model="params.type" placeholder="请选择属性类型">
                    <el-option v-for="item in typeList" :key="item.value" :label="item.name"
                               :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="属性分类">
                <el-select v-model="params.kind" placeholder="请选择属性分类">
                    <el-option v-for="item in kindList" :key="item.value" :label="item.name"
                               :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="属性排序">
                <el-input v-model="params.pos" placeholder="请填写属性排序"></el-input>
            </el-form-item>
        </el-form>

        <div class="button-group">
            <el-button @click="search" type="primary" size="small">查询</el-button>
            <el-button @click="create" type="primary" size="small">新建</el-button>
            <el-button @click="modify" type="primary" size="small">修改</el-button>
            <el-button @click="remove" type="primary" size="small">删除</el-button>
        </div>

        <grid ref="grid" :config="config" class="grid">
            <el-table-column label="操作" slot="opt">
                <el-button size="small" slot-scope="{ row }">修改</el-button>
                <el-button size="small" slot-scope="{ row }">删除</el-button>
            </el-table-column>
        </grid>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';
import env from '@/config/env';
import string from '@/util/string';
import common from '@/util/common';
import grid from '@/components/grid/index';

export default {
    components: {
        grid
    },
    data() {
        let _this = this;
        return {
            typeList: [{
                value: 'number',
                name: '数值'
            }, {
                value: 'color',
                name: '颜色'
            }, {
                value: 'radio',
                name: '单选'
            }, {
                value: 'mime',
                name: '多媒体'
            }],
            kindList: [{
                value: 'style',
                name: '样式'
            }, {
                value: 'biz',
                name: '后端逻辑'
            }, {
                value: 'ixd',
                name: '交互'
            }],
            params: {
                code: '',
                name: '',
                val: '',
                type: '',
                kind: '',
                pos: ''
            },
            config: {
                url: `${env['apiPrefix']}/home/opt/list`,
                params() {
                    return _this.params;
                },
                columnModel: [{
                    code: 'id',
                    label: '标识'
                }, {
                    code: 'code',
                    label: '属性代码'
                }, {
                    code: 'name',
                    label: '属性名称'
                }, {
                    code: 'val',
                    label: '属性值'
                }, {
                    code: 'type',
                    label: '属性类型'
                }, {
                    code: 'kind',
                    label: '属性分类'
                }, {
                    code: 'pos',
                    label: '属性排序'
                }]
            }
        };
    },
    mounted() {
        let self = this;
    },
    methods: {
        search() {
            this.$refs.grid.search();
        },
        create() {
            this.$router.push({
                path: '/home/opt/edit'
            });
        },
        modify() {
            let rowsSelected = this.$refs.grid.getRowsSelected();
            if (rowsSelected.length === 0) {
                this.$alert('', '请选择行', {
                    confirmButtonText: '确定',
                    center: true
                });
                return false;
            }
            if (rowsSelected.length > 1) {
                this.$alert('', '请选择一行', {
                    confirmButtonText: '确定',
                    center: true
                });
                return false;
            }
            this.$router.push({
                path: `/home/opt/edit?id=${rowsSelected[0]['id']}`
            });
        },
        remove() {
            let rowsSelected = this.$refs.grid.getRowsSelected();
            if (rowsSelected.length === 0) {
                this.$alert('', '请选择行', {
                    confirmButtonText: '确定',
                    center: true
                });
                return false;
            }
            let arr = [];
            rowsSelected.forEach((obj) => {
                arr.push({
                    id: obj['id']
                });
            });
            // todo
            console.log(arr);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
