module Game {

    export class PanelRoleUI extends GamePanel {

        public UIA_head: egret.gui.UIAsset;

        public label_name: egret.gui.Label;

        public label_lv: egret.gui.Label;

        public label_coin: egret.gui.Label;

        public label_diamond: egret.gui.Label;

        public constructor() {
            super();
            this.skinName = "skins.panel.panelRoleSkin";
        }
    }
}