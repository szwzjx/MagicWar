module Game {

    export class PanelLogin extends PanelLoginUI {

        public constructor() {
            super();
            this.name = "PanelLogin";
            this.width = Game.Config.getInstance().STAGE_WIDTH;
            this.height = Game.Config.getInstance().STAGE_HEIGHT;
        }

        //--------------------------------------------------------------------------------
        public childrenCreated():void
        {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleTap,this);
        }

        //--------------------------------------------------------------------------------
        public partAdded(partName: string, instance: any): void
        {
            super.partAdded(partName, instance);

            if (instance == this.btn_login)
            {

            }
        }

        //--------------------------------------------------------------------------------
        public handleTap(e: egret.TouchEvent): void
        {
            var obj = e.target;
            
            if (obj)
            {
                switch (obj.name)
                {
                    case "btn_login":

                        if (this.checkLogin())
                        {
                             NetCenter.instance.ctsLogin(this.ti_name.text, this.ti_pwd.text);
                        }

                        break;

                    case "btn_register":

                        NetCenter.instance.ctsRegister("123", "123");
                        break;

                    default:
                        break;
                }
            }
        }

        //--------------------------------------------------------------------------------
        private checkLogin(): boolean
        {
            var warn: string = "";
            var reg: RegExp = /^\d+$/g;
            var regPW: RegExp = /^[A-Za-z0-9]+$/g;

            if (!reg.test(this.ti_name.text) || this.ti_name.text.length != 11 || this.ti_name.text.charAt(0) != "1")
            {
                warn = (warn == "") ? "请输入正确的手机号！" : warn;
            }  
                    
            if (this.ti_pwd.text == "")
            {
                warn = (warn == "") ? "密码不能为空！" : warn;
            }

            if (this.ti_pwd.text.length < 6)
            {
                warn = (warn == "") ? "密码长度不能少于6位！" : warn;
            }

            if (!regPW.test(this.ti_pwd.text))
            {
                warn = (warn == "") ? "密码有非法字符！" : warn;
            }

            Log.L.WARN(warn);
            return (warn == "") ? true : false;
        }

        //--------------------------------------------------------------------------------
        private adjustSize(): void
        {

        }
    }
}