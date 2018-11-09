import { app, BrowserWindow, ipcMain, Menu } from 'electron'; // eslint-disable-line
import common from '@@/util/common';
import ipc from '@@/util/ipc';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}
let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080'
    : `file://${__dirname}/index.html`;
ipcMain.on('server', (event, messageJson) => {
    console.log('server', event, messageJson);
    let message = common.decode(messageJson);
    let req = message['req'] || '';
    let rev = message['rev'] || 'error';
    let paramObj = message['param'] || {};
    let sender = event.sender;
    if (!req || !ipc[req]) {
        sender.send('client', common.encode({
            req: rev,
            code: -1,
            msg: 'fn is not exists'
        }));
        return false;
    }
    ipc[req](paramObj).then((response) => {
        sender.send('client', common.encode({
            req: rev,
            code: 0,
            msg: 'success',
            data: response
        }));
    }, (err) => {
        sender.send('client', common.encode({
            req: rev,
            code: 1,
            msg: err
        }));
    });
});
function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
    });
    Menu.setApplicationMenu(null);
    mainWindow.loadURL(winURL);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
 import { autoUpdater } from 'electron-updater'

 autoUpdater.on('update-downloaded', () => {
 autoUpdater.quitAndInstall()
 })

 app.on('ready', () => {
 if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
 })
 */
