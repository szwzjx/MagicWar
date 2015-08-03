module Game {

    export class PanelRoleUI extends GamePanel {

        public UIA_head: egret.gui.UIAsset;

        public lable_name: egret.gui.Label;

        public lable_lv: egret.gui.Label;

        public constructor() {
            super();
            this.skinName = "skins.panel.panelRoleSkin";
        }
    }
}