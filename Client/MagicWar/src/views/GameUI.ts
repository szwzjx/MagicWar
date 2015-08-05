module Game {
    export class GameUI extends egret.gui.UIStage{

        public ALL_PANEL: any[];

        public panelLogin: PanelLogin;

        public panelRole: PanelRoleUI;

        public constructor()
        {
            super();
            this.ALL_PANEL = [];
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

        /**
         * @ name: panel name
         * @ action: "open" or "close"
         */
        //--------------------------------------------------------------------------------
        public manage_panel(name:string,action:string): void
        {

        }
    }
}