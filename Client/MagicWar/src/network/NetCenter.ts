module Net {
    export class NetCenter {

        public mWebSocket: egret.WebSocket;

        public static instance: NetCenter;

        public constructor() {

        }

        //--------------------------------------------------------------------------------
        public init()
        {
            if (window["WebSocket"])
            {
                if (this.mWebSocket)
                {
                    this.mWebSocket.close();
                    this.mWebSocket = null;
                }

                try
                {
                    this.mWebSocket = new egret.WebSocket();
                    this.mWebSocket.connected
                    this.mWebSocket.connect(Game.Config.getInstance().MAGICWAR_IP, Game.Config.getInstance().MAGUCWAR_PORT);
                    this.mWebSocket.addEventListener(egret.Event.CONNECT, this.doOpen, this);
                    this.mWebSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.doMessage, this);
                    this.mWebSocket.addEventListener(egret.Event.CLOSE, this.doClose, this);
                    this.mWebSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.doError, this);
                }
                catch (e)
                {
                    Game.Log.getInstance().MSG_LOG(Game.ConstString.eFailedWS);
                    return;
                }
            }
            else
            {
                Game.Log.getInstance().MSG_LOG(Game.ConstString.eNotWS);
                return;
            }
        }

        //--------------------------------------------------------------------------------
        public register(name:string,password:string): void
        {
            var msg = {
                MWP: NetProtocol.ctsRegister,
                Name: name,
                Password:password
            };

            this.send(msg);
        }

        //--------------------------------------------------------------------------------
        public reviseMsg(message:any): any
        {
            var msg = JSON.stringify(message);
            return msg;
        }

        //--------------------------------------------------------------------------------
        public send(message: any): void
        {
            if (this.reviseMsg(message) && this.reviseMsg(message) != "")
            {
                if (this.mWebSocket && this.mWebSocket.connected)
                {
                    this.mWebSocket.writeUTF(this.reviseMsg(message));
                }
            }
        }

        //--------------------------------------------------------------------------------
        public close(): void
        {
            if (this.mWebSocket)
            {
                this.mWebSocket.close();
            }
        }

        //--------------------------------------------------------------------------------
        public doOpen(e: egret.Event): void
        {
            Game.Log.getInstance().MSG_LOG("WebSocket connect success!");
        }

        //--------------------------------------------------------------------------------
        public doMessage(e: egret.ProgressEvent): void
        {
            var msg = this.mWebSocket.readUTF();
            Game.Log.getInstance().MSG_LOG("Client get message：" + msg);
        }

        //--------------------------------------------------------------------------------
        public doClose(e: egret.Event): void
        {
            Game.Log.getInstance().MSG_WARN("WebSocket connect close!");
        }

        //--------------------------------------------------------------------------------
        public doError(e: egret.Event): void
        {
            Game.Log.getInstance().MSG_ERROE("WebSocket connect error!");
        }

        //--------------------------------------------------------------------------------
        public static getInstance(): NetCenter
        {
            if (!this.instance)
            {
                this.instance = new NetCenter();
            }

            return <NetCenter><any>(this.instance);
        }
    }
}