import { dialog } from 'electron';
import common from '@@/util/common';
let chooseDir = () => {
    return new Promise((resolve) => {
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }, (filePaths) => {
            console.log(filePaths);
            resolve(filePaths);
        });
    });
};
let readDirTree = (param) => {
    return new Promise((resolve) => {
        let dirTree = common.listDirTree(param['dirPath']);
        resolve(dirTree);
    });
};
let readFileMeta = (param) => {
    return new Promise((resolve) => {
        let fileMeta = common.readFileMeta(param['dirPath']);
        resolve(fileMeta);
    });
};
let readFileData = (param) => {
    return new Promise((resolve) => {
        let fileContent = common.loadFileData(param['filePath']);
        resolve(fileContent);
    });
};
let readSubFileMeta = (param) => {
    return new Promise((resolve) => {
        let subFileMetaList = common.readSubFileMeta(param['filePath']);
        resolve(subFileMetaList);
    });
};
export default {
    chooseDir,
    readDirTree,
    readFileMeta,
    readFileData,
    readSubFileMeta
};