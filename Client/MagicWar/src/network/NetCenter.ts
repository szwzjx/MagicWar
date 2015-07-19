module Net {
    export class NetCenter {

        public mWebSocket: egret.WebSocket;

        public constructor() {

        }

        //--------------------------------------------------------------------------------
        public init() {
            if (window["WebSocket"]) {
                if (this.mWebSocket) {
                    this.mWebSocket.close();
                    this.mWebSocket = null;
                }

                try
                {
                    this.mWebSocket = new egret.WebSocket();
                    this.mWebSocket.connect(Game.Config.MAGICWAR_IP, Game.Config.MAGUCWAR_PORT);
                    this.mWebSocket.addEventListener(egret.Event.CONNECT, this.doOpen, this);
                    this.mWebSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.doMessage, this);
                    this.mWebSocket.addEventListener(egret.Event.CLOSE, this.doClose, this);
                    this.mWebSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.doError, this);
                }
                catch (e) {
                    console.log(Game.ConstString.eFailedWS);
                    return;
                }
            }
            else {
                console.log(Game.ConstString.eNotWS);
                return;
            }
        }

        //--------------------------------------------------------------------------------
        public send(message: any): void {
            if (this.mWebSocket) {
                this.mWebSocket.writeUTF(message);
            }
        }

        //--------------------------------------------------------------------------------
        public close(): void {
            if (this.mWebSocket) {
                this.mWebSocket.close();
            }
        }

        //--------------------------------------------------------------------------------
        public doOpen(e: egret.Event): void {

        }

        //--------------------------------------------------------------------------------
        public doMessage(e: egret.ProgressEvent): void {

        }

        //--------------------------------------------------------------------------------
        public doClose(e: egret.Event): void {

        }

        //--------------------------------------------------------------------------------
        public doError(e: egret.Event): void {

        }
    }
}