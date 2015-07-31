module Net {
    export class NetCenter {

        public mWebSocket: egret.WebSocket;

        public NETEVENT: any[];

        public static instance: NetCenter;

        public constructor()
        {
            this.NETEVENT = [];
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
                    Game.Log.L().LOG(Game.ConstString.eFailedWS);
                    return;
                }
            }
            else
            {
                Game.Log.L().LOG(Game.ConstString.eNotWS);
                return;
            }
        }

        //--------------------------------------------------------------------------------
        private regEssential(): void
        {
            this.regEvent(NetProtocol.ctsRegister, this.stcRegister);
        }

        //--------------------------------------------------------------------------------
        private regEvent(value:number,fun:any): void
        {
            this.NETEVENT[value] = fun;
        }

        //--------------------------------------------------------------------------------
        private resEvent(value: number, param: any): any
        {
            var fun = this.NETEVENT[value];

            if (typeof fun == "function")
            {
                return fun(param);
            }

            Game.Log.L().ERROE("Not found function:" +  value);
        }

        //--------------------------------------------------------------------------------
        public ctsRegister(name:string,password:string): void
        {
            var msg = {
                MWP: NetProtocol.ctsRegister,
                Name: name,
                Password:password
            };

            this.send(msg);
        }

        //--------------------------------------------------------------------------------
        private stcRegister(data:any): void
        {
            if (data)
            {

            }
            else
            {
                Game.Log.L().ERROE(Game.ConstString.eFailedRegister);
            }
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
            Game.Log.L().LOG("WebSocket connect success!");
        }

        //--------------------------------------------------------------------------------
        public doMessage(e: egret.ProgressEvent): void
        {
            var msg = this.mWebSocket.readUTF();
            var data = JSON.parse(msg);

            if (data)
            {
                if (data["MWP"] && data["data"])
                {
                    this.resEvent(data["MWP"],data["data"]);
                }

                Game.Log.L().LOG("Client get message：" + data["MWP"]);
                return;
            }

            Game.Log.L().ERROE("ERROR：" + msg);
        }

        //--------------------------------------------------------------------------------
        public doClose(e: egret.Event): void
        {
            Game.Log.L().WARN("WebSocket connect close!");

            if (this.mWebSocket)
            {
                this.mWebSocket.removeEventListener(egret.Event.CONNECT, this.doOpen, this);
                this.mWebSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.doMessage, this);
                this.mWebSocket.removeEventListener(egret.Event.CLOSE, this.doClose, this);
                this.mWebSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.doError, this);
                this.mWebSocket = null;
            }
        }

        //--------------------------------------------------------------------------------
        public doError(e: egret.Event): void
        {
            Game.Log.L().ERROE("WebSocket connect error!");
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