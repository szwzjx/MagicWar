module Game {
    export class NetCenter extends egret.EventDispatcher{
        /**HTML5 WebSocket*/
        public mWebSocket: egret.WebSocket;
        /**register event*/
        public NETEVENT: any[];
        /**Game.Data.instance*/
        public DATA: any;

        public static _instance: NetCenter;

        public constructor()
        {
            super();
            this.NETEVENT = [];
            this.DATA = Game.Data.instance;
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
                    this.mWebSocket.connect(Game.Config.instance.MAGICWAR_IP, Game.Config.instance.MAGUCWAR_PORT);
                    this.mWebSocket.addEventListener(egret.Event.CONNECT, this.doOpen, this);
                    this.mWebSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.doMessage, this);
                    this.mWebSocket.addEventListener(egret.Event.CLOSE, this.doClose, this);
                    this.mWebSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.doError, this);
                }
                catch (e)
                {
                    Game.Log.L.LOG(Game.ConstString.eFailedWS);
                    return;
                }
            }
            else
            {
                Game.Log.L.LOG(Game.ConstString.eNotWS);
                return;
            }
        }
        
        //--------------------------------------------------------------------------------
        private regEssential(): void
        {
            this.regEvent(NetProtocol.ctsRegister, this.stcRegister);
            this.regEvent(NetProtocol.ctsGetRole, this.stcGetRole);
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

            Game.Log.L.ERROE("Not found function:" +  value);
        }

        /*-------------------------------------------------------------------------------
                                      client --> server               
          -------------------------------------------------------------------------------*/

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
        public ctsGetRole(name: string): void
        {
            var msg = {
                MWP: NetProtocol.ctsGetRole,
                Name: name,
            };

            this.send(msg);
        }

        //--------------------------------------------------------------------------------
        public ctsLogin(name: string, password: string): void {
            var msg = {
                MWP: NetProtocol.ctsLogin,
                Name: name,
                Password: password
            };

            this.send(msg);
        }

        /*--------------------------------------------------------------------------------
                                      server --> client               
          -------------------------------------------------------------------------------*/

        //--------------------------------------------------------------------------------
        private stcRegister(data:any): void
        {
            if (data)
            {

            }
            else
            {
                Game.Log.L.ERROE(Game.ConstString.eFailedRegister);
            }
        }

        //--------------------------------------------------------------------------------
        private stcGetRole(data:any): void
        {
            if (data.correct == 0)
            {
                this.DATA.mDRole.mName = data.Name;
                this.DATA.mDRole.mLv = data.Lv;
                this.DATA.mDRole.mHead = data.Head;

                this.dispatchEvent(new NetEvent(NetEvent.EVENT_ROLE,[]));
            }
            else
            {
                Game.Log.L.ERROE("ERROR: " +　data.error);
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
                else
                {
                    Game.Log.L.ERROE("未连接到服务器！");
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
            Game.Log.L.LOG("WebSocket connect success!");
        }

        //--------------------------------------------------------------------------------
        public doMessage(e: egret.ProgressEvent): void
        {
            var buff = this.mWebSocket.readUTF();
            var msg = JSON.parse(buff);

            if (msg)
            {
                if (msg["MWP"] && msg["data"])
                {
                    var data = JSON.parse(msg["data"]);
                    
                    if (data)
                    {
                        this.resEvent(msg["MWP"], data);
                    }
                    else
                    {
                        Game.Log.L.ERROE(msg["MWP"] + " [[--JSON.parse(msg['data'])--]] error!")
                    }
                }

                Game.Log.L.LOG("Client get message：" + msg["MWP"]);
                return;
            }

            Game.Log.L.ERROE("ERROR：" + buff);
        }

        //--------------------------------------------------------------------------------
        public doClose(e: egret.Event): void
        {
            Game.Log.L.WARN("WebSocket connect close!");

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
            Game.Log.L.ERROE("WebSocket connect error!");
        }

        //--------------------------------------------------------------------------------
        public static set instance(value: NetCenter) {
            this._instance = value;
        }

        //--------------------------------------------------------------------------------
        public static get instance(): NetCenter
        {
            if (!this._instance)
            {
                this._instance = new NetCenter();
            }

            return <NetCenter><any>(this._instance);
        }
    }
}