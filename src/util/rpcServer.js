import { ipcMain } from 'electron';
import ipc from '@/util/ipc';
import common from './common';
class RpcServer {
    constructor() {
        this.listenClient();
    }

    listenClient() {
        let _this = this;
        ipcMain.on('server', (event, messageJson) => {
            console.log('server', messageJson);
            let message = common.decode(messageJson);
            let reqId = message['reqId'];
            let channel = message['channel'] || '';
            let param = message['param'] || {};
            let sender = event.sender;
            if (!channel || !ipc[channel]) {
                _this.send2Client(sender, reqId, {
                    reqId: reqId,
                    code: -1,
                    msg: 'channel is not exists'
                });
                return false;
            }
            ipc[channel](param).then((data) => {
                _this.send2Client(sender, reqId, {
                    reqId: reqId,
                    code: 0,
                    msg: 'success',
                    data: data
                });
            }, (err) => {
                _this.send2Client(sender, reqId, {
                    reqId: reqId,
                    code: 1,
                    msg: err
                });
            });
        });
    }

    send2Client(sender, reqId, response) {
        sender.send('client', common.encode({
            reqId: reqId,
            response: response
        }));
    }
}
export default new RpcServer();