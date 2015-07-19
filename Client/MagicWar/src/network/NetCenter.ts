module Net {
    export class NetCenter {

        public mWebSocket: egret.WebSocket;

        public static instance: NetCenter;

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
            console.log("WebSocket connect success!");
            this.send("I'm cool!");
        }

        //--------------------------------------------------------------------------------
        public doMessage(e: egret.ProgressEvent): void {
            //console.log("WebSocket on message!");
            var msg = this.mWebSocket.readUTF();
            console.log("Client get message：" + msg);
        }

        //--------------------------------------------------------------------------------
        public doClose(e: egret.Event): void {
            console.warn("WebSocket connect close!");
        }

        //--------------------------------------------------------------------------------
        public doError(e: egret.Event): void {
            console.error("WebSocket connect error!");
        }

        //--------------------------------------------------------------------------------
        public static getInstance(): NetCenter {
            if (!this.instance) {
                this.instance = new NetCenter();
            }

            return <NetCenter><any>(this.instance);
        }
    }
}