module Game {
    export class GameUI extends egret.gui.UIStage{

        public panelLogin: PanelLogin;

        public panelRole: PanelRoleUI;

        public constructor()
        {
            super();
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            this.panelLogin = new PanelLogin();
            this.addElement(this.panelLogin);

            this.panelRole = new PanelRoleUI();
            this.addElement(this.panelRole);
        }
    }
}