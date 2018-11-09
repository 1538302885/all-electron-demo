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
let readFileData = (param) => {
    return new Promise((resolve) => {
        let fileContent = common.loadFileData(param['filePath']);
        resolve(fileContent);
    });
};
export default {
    chooseDir,
    readDirTree,
    readFileData
};