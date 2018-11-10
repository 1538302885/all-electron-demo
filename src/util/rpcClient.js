import { ipcRenderer } from 'electron';
import common from './common';
class RpcClient {
    constructor() {
        this.reqId = 0;
        this.reqMap = {};
        this.listenServer();
    }

    generateReqId() {
        ++this.reqId;
        return this.reqId;
    };

    listenServer() {
        let _this = this;
        ipcRenderer.on('client', (event, messageJson) => {
            console.log('client', messageJson);
            let message = common.decode(messageJson);
            let reqId = message['reqId'];
            let response = message['response'] || {};
            let code = response['code'];
            let data = response['data'];
            if (!reqId || !_this.reqMap[reqId]) {
                // reqId不存在或异步回调不存在
                return false;
            }
            let method = code === 0 ? 'resolve' : 'reject';
            _this.reqMap[reqId][method](data);
        });
    }

    send(channel, param) {
        if (!channel) {
            throw new Error('channel is empty');
            return false;
        }
        let _this = this;
        return new Promise((resolve, reject) => {
            let reqId = _this.generateReqId();
            let message = {
                reqId: reqId,
                channel: channel,
                param: param || {}
            };
            let messageJson = common.encode(message);
            _this.reqMap[`${reqId}`] = {resolve, reject};
            ipcRenderer.send('server', messageJson);
        });
    }
}
export default new RpcClient();