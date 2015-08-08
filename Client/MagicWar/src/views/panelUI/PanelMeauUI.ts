module Game {

    export class PanelMeauUI extends GamePanel {

        public UIA_meau: egret.gui.UIAsset;

        public UIA_fight: egret.gui.UIAsset;

        public UIA_equip: egret.gui.UIAsset;

        public UIA_bag: egret.gui.UIAsset;

        public constructor() {
            super();
            this.skinName = "skins.panel.panelMeauSkin";
        }
    }
}