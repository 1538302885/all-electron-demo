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
                    <el-tree ref="dirTree" :data="dirTree" :props="defaultProps" :load="loadSubFile" lazy
                             @node-click="treeNodeClick"></el-tree>
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

import rpcClient from '@@/util/rpcClient';

export default {
    components: {
        codemirror
    },
    data() {
        return {
            code: '',
            cmOptions: {
                tabSize: 4,
                mode: 'text/javascript',
                lineNumbers: true
            },
            defaultProps: {
                children: 'children',
                label: 'fileName',
                isLeaf: 'isLeaf'
            },
            dirTree: [],
            treeNodeSelected: null
        }
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
            let _this = this;
            rpcClient.send('chooseDir', {}).then((paths) => {
                _this.readDirMeta(paths);
            });
        },
        readDirMeta(paths) {
            console.log('readDirMeta', paths);
            if (!paths) {
                // 路径不存在说明用户取消了操作则页面不作处理
                return false;
            }
            let _this = this;
            let dirPath = paths[0];
            rpcClient.send('readFileMeta', {dirPath}).then((fileMeta) => {
                _this.displayDir(fileMeta);
            });
        },
        displayDir(fileMeta) {
            if (!fileMeta) {
                // 目录不存在
                return false;
            }
            this.dirTree = this.dirTree.concat([Object.assign({
                isLeaf: !fileMeta['isDirectory']
            }, fileMeta)]);
        },
        loadSubFile(node, resolve) {
            let nodeData = node['data'];
            if (!nodeData['filePath'] || nodeData['isLeaf']) {
                // 如果是文件则不需要加载子文件
                resolve([]);
                return false;
            }
            let _this = this;
            let filePath = nodeData['filePath'];
            console.log('filePath', filePath);
            rpcClient.send('readSubFileMeta', {filePath}).then((subFileMetaList) => {
                resolve(subFileMetaList.map((subFileMeta) => {
                    return Object.assign({
                        isLeaf: !subFileMeta['isDirectory']
                    }, subFileMeta);
                }));
            });
        },
        treeNodeClick(node) {
            console.log('node', node);
            if (node['isDirectory']) {
                // 如果是目录则不作处理
                return false;
            }
            let _this = this;
            _this.treeNodeSelected = node;
            rpcClient.send('readFileData', {filePath: node['filePath']}).then((subFileMetaList) => {
                _this.displayFileData(subFileMetaList);
            });
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
