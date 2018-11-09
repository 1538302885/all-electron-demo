<template>
    <div class="body">
        <div>
            <el-button @click="showDirDialog" plain>打开</el-button>
        </div>
        <el-container>
            <!--顶部栏-->
            <el-header height="50px">header</el-header>
            <el-container>
                <!--左侧侧边栏-->
                <el-aside width="300px">
                    <el-tree :data="dirTree" :props="defaultProps" @node-click="treeNodeClick"></el-tree>
                </el-aside>
                <!--主-->
                <el-main>
                    <!--编辑器-->
                    <codemirror :value="code" :options="cmOptions"></codemirror>
                    <!--<div class="ace-container">
                        <div class="ace-editor" ref="ace"></div>
                    </div>-->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script type="text/ecmascript-6">
/**
 // Ace
 import ace from 'ace-builds'
 import 'ace-builds/src-noconflict/snippets/javascript'
 import 'ace-builds/src-noconflict/snippets/html'
 import 'ace-builds/src-noconflict/snippets/css'
 import 'ace-builds/src-noconflict/snippets/scss'
 import 'ace-builds/src-noconflict/snippets/json'
 import 'ace-builds/src-noconflict/snippets/java'
 import 'ace-builds/src-noconflict/snippets/text'
 import 'ace-builds/src-noconflict/ext-language_tools'
 import 'ace-builds/webpack-resolver' // 在 webpack 环境中使用必须要导入
 import 'ace-builds/src-noconflict/theme-monokai' // 默认设置的主题
 import 'ace-builds/src-noconflict/mode-javascript' // 默认设import 置的语言模式

 export default {
        mounted() {
            this.aceEditor = ace.edit(this.$refs.ace, {
                maxLines: 20, // 最大行数，超过会自动出现滚动条
                minLines: 10, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
                fontSize: 16, // 编辑器内字体大小
                theme: this.themePath, // 默认设置的主题
                mode: this.modePath, // 默认设置的语言模式
                tabSize: 4 // 制表符设置为 4 个空格大小
            });
            // 激活自动提示
            this.aceEditor.setOptions({
                enableSnippets: true,
                enableLiveAutocompletion: true,
                enableBasicAutocompletion: true
            });
            this.aceEditor.getSession().on('change', this.change)
        },
        data() {
            return {
                aceEditor: null,
                toggle: false,
                wrap: true,
                themePath: 'ace/theme/monokai',
                modePath: 'ace/mode/javascript',
            }
        },
        methods: {
            change() {
                this.$emit('input', this.aceEditor.getSession().getValue())
            }
        }
    }**/


import {codemirror} from 'vue-codemirror';
import "codemirror/mode/python/python.js";
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/comment-fold.js';

import { ipcRenderer } from 'electron';
import common from '@@/util/common';

export default {
    components: {
        codemirror
    },
    data() {
        return {
            code: '123',
            cmOptions: {
                tabSize: 4,
                mode: 'text/javascript',
                lineNumbers: true,
            },
            defaultProps: {
                children: 'children',
                label: 'fileName'
            },
            dirTree: [],
            treeNodeSelected: null
        }
    },
    created() {
        let _this = this;
        ipcRenderer.on('client', (event, messageJson) => {
            console.log('client', event, messageJson);
            let message = common.decode(messageJson);
            let req = message['req'] || '';
            let code = message['code'] || 0;
            let data = message['data'] || {};
            if (!req || !_this[req]) {
                return false;
            }
            if (code !== 0) {
                // 弹窗提示错误 todo
                return false;
            }
            _this[req](data);
        });
    },
    mounted() {
    },
    methods: {
        changes() {
            if (this.msg = "") {
                this.placeholder = "aaaaaaa";
            }
            else {
                this.placeholder = "";
            }
        },
        getName(){
            return this.$electron.remote.app.getName();
        },
        showDirDialog() {
            let messageJson = common.encode({
                req: 'chooseDir',
                rev: 'loadDirTree'
            });
            ipcRenderer.send('server', messageJson);
        },
        loadDirTree(paths) {
            console.log('loadDirTree', paths);
            if (!paths) {
                // 路径不存在说明用户取消了操作则页面不作处理
                return false;
            }
            let dirPath = paths[0];
            let messageJson = common.encode({
                req: 'readDirTree',
                rev: 'displayDirTree',
                param: {
                    dirPath
                }
            });
            ipcRenderer.send('server', messageJson);
        },
        displayDirTree(root) {
            if (!root) {
                // 目录不存在
                return false;
            }
            this.dirTree = [root];
        },
        treeNodeClick(node) {
            console.log('node', node);
            if (node['isDirectory']) {
                // 如果是目录则不作处理
                return false;
            }
            this.treeNodeSelected = node;
            let messageJson = common.encode({
                req: 'readFileData',
                rev: 'displayFileData',
                param: {
                    filePath: node['filePath']
                }
            });
            ipcRenderer.send('server', messageJson);
        },
        displayFileData(content) {
            this.code = content;
        }
    }
}
</script>

<style>
    .body {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
    }

    .el-container {
        height: 100%;
    }

    .el-header {
        border: 1px solid black;
        background: lightskyblue;
    }

    .el-aside {
        border: 1px solid black;
    }

    .el-main {
        border: 1px solid black;
    }

    .ace-container {
        position: relative;
    }

</style>
