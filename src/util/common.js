import fs from 'fs';
import path from 'path';
let encode = (obj) => {
    return JSON.stringify(obj);
};
let decode = (str) => {
    return JSON.parse(str);
};
let listDirTree = (filePath)=> {
    if (!fs.existsSync(filePath)) {
        return null;
    }
    let stat = fs.lstatSync(filePath);
    let isDirectory = stat.isDirectory();
    let subFileNames = isDirectory ? fs.readdirSync(filePath) : [];
    console.log('subFileNames', subFileNames);
    let file = {
        filePath: filePath,
        fileName: filePath,
        isDirectory: isDirectory,
        children: subFileNames.map((subFileName) => {
            let subFilePath = path.join(filePath, subFileName);
            return listDirTree(subFilePath);
        })
    };
    return file;
};
let loadFileData = (filePath) => {
    if (!fs.existsSync(filePath)) {
        return '';
    }
    return fs.readFileSync(filePath, 'utf8');
};
export default {
    encode,
    decode,
    listDirTree,
    loadFileData
};