<template>
    <div @drop="dropToPage" @click="unselectCmp" class="body">
        <div @dragover="dragOverSource" class="pane-cmp">
            <div @dragstart="dragStartSource($event, item)" v-for="item in source.list" :key="item.type"
                 draggable="true" class="item">
                <img :src="item.icon">
            </div>
        </div>

        <div class="body-phone"
             :style="{background: 'url('+bgPhoneUrl+') center center no-repeat', backgroundSize: '100% 100%'}">
            <div ref="panePhone" @drop="dropToTarget" @dragover="dragOverTarget" class="pane-phone">
                <div @dragstart="dragStartTarget($event, item)" @click="chooseCmp($event, item)"
                     v-for="item in target.list" :key="item.timestamp" draggable="true"
                     :class="['body-cmp', item.isClick?'active':'']">
                    <div v-if="item.isClick" @click="removeCmp(item)" class="icon-close"></div>
                    <component v-bind:is="item.name" :attrOption="item.opt.attr"
                               :styleOption="item.opt.style"></component>
                </div>
            </div>
        </div>

        <div @click="stopPropagation" class="body-opt">
            <template v-for="item in target.list">
                <div v-if="item.isClick" :key="item.id">
                    <div v-for="tplOptItem in item.tplOpt" class="row">
                        <div class="label">{{tplOptItem.name}}:</div>
                        <input v-model="item['opt'][tplOptItem['kind']][tplOptItem['code']]" type="text"
                               placeholder="请输入值" class="input">
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';
import env from '@/config/env';
import string from '@/util/string';
import common from '@/util/common';
import cmp from '@/config/cmp';
import data from '@/entry/home/pane/data';
export default {
    components: {
        ...cmp
    },
    data() {
        return {
            bgPhoneUrl: 'static/resource/img/pro/bg_iphone.png',
            source: {
                list: []
            },
            target: {
                list: []
            },
            tplCmpList: [],
            tplCmpOptList: {},
            cmpSelected: {},
            panePhoneBcr: {}
        };
    },
    mounted() {
        this.panePhoneBcr = this.$refs.panePhone.getBoundingClientRect();
        this.source.list = data.tplCmpList;
        this.initTplCmpList(data.tplCmpList, data.tplCmpOptList);
    },
    methods: {
        initTplCmpList(cmpList, cmpOptList) {
            let tplCmpList = [];
            cmpList.forEach((cmpItem) => {
                let cmp = Object.assign({
                    opt: {},
                    tplOpt: []
                }, cmpItem);
                cmpOptList.forEach((cmpOptItem) => {
                    if (cmpItem['id'] === cmpOptItem['tplCmpId']) {
                        // 组件里添加属性
                        let optKind = cmpOptItem['kind'];
                        let optCode = cmpOptItem['code'];
                        let optVal = cmpOptItem['val'];
                        cmp['opt'][optKind] = cmp['opt'][optKind] || {};
                        cmp['opt'][optKind][optCode] = optVal;
                        // 记录每个组件的属性列表
                        cmp['tplOpt'].push(Object.assign({}, cmpOptItem));
                    }
                });
                tplCmpList.push(cmp);
            });
            this.tplCmpList = tplCmpList;
        },
        dragStartSource(e, item) {
            let jsonStr = JSON.stringify({
                id: item['id'],
                from: 'source'
            });
            e.dataTransfer.setData('Text', jsonStr);
        },
        dragOverSource(e) {
            e.preventDefault();
        },
        dragOverTarget(e) {
            e.preventDefault();
        },
        dropToSource(e) {
            e.preventDefault();
            console.log('dropToSource', e);
            let transferData = JSON.parse(e.dataTransfer.getData('Text'));
            if (transferData['from'] !== 'target') {
                // todo
                return false;
            }
            let timestamp = transferData['timestamp'];
            if (!timestamp) {
                console.log('timestamp not exists');
                return false;
            }
            let targetArr = [];
            this.target.list.forEach((obj, index) => {
                console.log(obj, index);
                if (obj['timestamp'] !== timestamp) {
                    targetArr.push(obj);
                }
            });
            this.target.list = targetArr;
        },
        dropToPage(e) {
            e.preventDefault();
            console.log('dropToPage', e);
        },
        dragStartTarget(e, item) {
            let jsonStr = JSON.stringify({
                timestamp: item['timestamp'],
                from: 'target'
            });
            e.dataTransfer.setData('Text', jsonStr);
        },
        pxScale(obj) {
            for (let key in obj) {
                let match = /^[\d]*\.?[\d]+px/.test(obj[key]);
                if (match) {
                    let number = (parseFloat(obj[key]) / 3).toFixed(2);
                    obj[key] = `${number}px`;
                }
            }
            return obj;
        },
        dropToTarget(e) {
            e.preventDefault();
            console.log('dropToTarget', e);
            let transferData = JSON.parse(e.dataTransfer.getData('Text'));
            if (transferData['from'] === 'target') {
                // todo
                return false;
            }
            let id = transferData['id'];
            if (!id) {
                console.log('id not exists');
                return false;
            }
            let sourceArr = this.tplCmpList.filter((obj) => {
                return obj['id'] === id;
            });
            let sourceObj = Object.assign({
                isClick: true,
                // 删除时根据时间戳标识
                timestamp: Date.now()
            }, JSON.parse(JSON.stringify(sourceArr[0])));
            // pc上需要转换像素尺寸
            sourceObj['opt']['style'] = this.pxScale(sourceObj['opt']['style']);
            let list = this.target.list.filter((obj) => {
                obj['isClick'] = false;
                return obj;
            });
            list.push(sourceObj);
            this.target.list = list;
        },
        chooseCmp(e, item) {
            e.stopPropagation();
            let list = this.target.list.filter((obj) => {
                obj['isClick'] = item['timestamp'] === obj['timestamp'];
                return obj;
            });
            this.target.list = list;
        },
        removeCmp(item) {
            let list = [];
            this.target.list.forEach((obj) => {
                if (item['timestamp'] !== obj['timestamp']) {
                    list.push(obj);
                }
            });
            this.target.list = list;
        },
        unselectCmp() {
            let list = this.target.list.filter((obj) => {
                obj['isClick'] = false;
                return obj;
            });
            this.target.list = list;
        },
        stopPropagation(e) {
            e.stopPropagation();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pane-cmp {
        display: inline-block;
        width: 150px;
        height: 500px;
        background-color: #cccccc;
        vertical-align: top;
    }

    .body-phone {
        position: relative;
        display: inline-block;
        width: 400px;
        height: 700px;
        vertical-align: top;
    }

    .pane-phone {
        position: absolute;
        top: 116px;
        left: 20px;
        right: 20px;
        bottom: 116px;
        background-color: #ffffff;
    }

    .item {
        display: inline-block;
        width: 58px;
        height: 58px;
        border: 1px solid #666666;
        margin: 10px 0 0 10px;
        vertical-align: middle;
    }

    .body-cmp {
        position: relative;
    }

    .body-cmp.active {
        border: 1px solid #333333;
    }

    .icon-close {
        position: absolute;
        top: 0;
        right: 0;
        display: inline-block;
        width: 32px;
        height: 32px;
        background: url("../../../assets/image/close.png") center center no-repeat;
        background-size: 100% 100%;
    }

    .body-opt {
        position: absolute;
        top: 0;
        right: 0;
        display: inline-block;
        width: 330px;
        background-color: #cccccc;
    }

    .row {
        margin: 10px 0;
    }

    .label {
        display: inline-block;
        width: 60px;
        text-align: right;
    }

    .input {
        display: inline-block;
        width: 210px;
        margin-left: 10px;
        padding: 0 10px;
    }
</style>
