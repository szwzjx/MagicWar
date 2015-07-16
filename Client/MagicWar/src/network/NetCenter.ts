module net {
    export class NetCenter {

        public MAGICWAR_IP = "127.0.0.1";
        public MAGUCWAR_PORT = 5668;

        public mWebSocket: egret.WebSocket;

        public constructor() {

        }

        //--------------------------------------------------------------------------------
        public init()
        {
            if (window["WebSocket"])
            {
                try
                {
                    this.mWebSocket = new egret.WebSocket();
                    this.mWebSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.doMessage, this);
                    this.mWebSocket.addEventListener(egret.Event.CONNECT, this.doOpen, this);
                }
                catch (e)
                {
                    console.log(Game.ConstString.eFailedWS);
                    return;
                }
            }
            else
            {
                console.log(Game.ConstString.eNotWS);
                return;
            }
        }

        //--------------------------------------------------------------------------------
        public doOpen(e:egret.Event): void {

        }

        //--------------------------------------------------------------------------------
        public doMessage(e: egret.ProgressEvent): void {

        }

        //--------------------------------------------------------------------------------
        public doSend(e: egret.ProgressEvent): void {

        }

        //--------------------------------------------------------------------------------
        public doClose(e: egret.Event): void {

        }

        //--------------------------------------------------------------------------------
        public doError(e: egret.Event): void {

        }
    }
}