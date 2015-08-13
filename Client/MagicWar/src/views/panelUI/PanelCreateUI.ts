module Game {

    export class PanelCreateUI extends GamePanel{
        
        public btn_rand: egret.gui.Button;

        public btn_create: egret.gui.Button;

        public ti_name: egret.gui.TextInput;

        public constructor() {
            super();
            this.skinName = "skins.panel.panelCreateSkin";
        }
    }
}