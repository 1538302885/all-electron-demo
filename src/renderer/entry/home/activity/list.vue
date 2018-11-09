<template>
    <div class="container">
        <el-form :inline="true" :model="params" class="form">
            <el-form-item label="活动名称">
                <el-input v-model="params.name" placeholder="请填写活动名称"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
                <el-date-picker type="datetime" placeholder="请选择开始时间" v-model="params.start"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker type="datetime" placeholder="请选择结束时间" v-model="params.end"></el-date-picker>
            </el-form-item>
            <el-form-item label="活动状态">
                <el-select v-model="params.status" placeholder="请选择活动状态">
                    <el-option v-for="item in statusList" :key="item.value" :label="item.name"
                               :value="item.value"></el-option>
                </el-select>
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
            statusList: [{
                value: '1',
                name: '未发布'
            }, {
                value: '2',
                name: '未开始'
            }, {
                value: '3',
                name: '进行中'
            }, {
                value: '4',
                name: '已結束'
            }],
            params: {
                name: '',
                start: '',
                end: '',
                status: ''
            },
            config: {
                data: [{
                    name: 'hyj',
                    age: 20
                }, {
                    name: 'hyj',
                    age: 20
                }, {
                    name: 'hyj',
                    age: 20
                }, {
                    name: 'hyj',
                    age: 20
                }],
                params() {
                    return _this.params;
                },
                columnModel: [{
                    code: 'name',
                    label: '名字'
                }, {
                    code: 'age',
                    label: '年龄'
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
                path: '/home/activity/edit'
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
                path: `/home/activity/edit?id=${rowsSelected[0]['id']}`
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
