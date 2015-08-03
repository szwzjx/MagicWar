module Game {

    export class PanelLoginUI extends GamePanel{
        
        public btn_login: egret.gui.Button;

        public btn_register: egret.gui.Button;

        public ti_pwd: egret.gui.TextInput;

        public ti_name: egret.gui.TextInput;

        public constructor() {
            super();
            this.skinName = "skins.panel.panelLoginSkin";
        }
    }
}