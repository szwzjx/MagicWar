module Game {
    /**include PanelRole、PanelMeau*/
    export class MainUI {

        public panelRole: PanelRole;

        public panelMeau: PanelMeau;

        public UNIT_LIST: Object;

        public static _instance: MainUI;

        public constructor() {
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            this.UNIT_LIST = [];
            this.panelRole = GameUI.instance.createPanel("PanelRole");
            this.panelMeau = GameUI.instance.createPanel("PanelMeau");
            this.UNIT_LIST["panelRole"] = this.panelRole;
            this.UNIT_LIST["panelMeau"] = this.panelMeau;
            this.panelRole.x = this.panelRole.y = 10;
            this.panelMeau.x = 0;
            this.panelMeau.y = Config.instance.STAGE_HEIGHT - 122;
        }

        //--------------------------------------------------------------------------------
        public manageContent(value:boolean): void
        {
            var gameUI = GameUI.instance;

            for (var unit in this.UNIT_LIST)
            {
                if (value)
                {
                    if (!gameUI.contains(this.UNIT_LIST[unit]))
                    {
                        GameUI.instance.addElement(this.UNIT_LIST[unit]);
                    }
                }
                else
                {
                    if (gameUI.contains(this.UNIT_LIST[unit]))
                    {
                        GameUI.instance.removeElement(this.UNIT_LIST[unit]);
                    }
                }
            }
        }

        //--------------------------------------------------------------------------------
        public static get instance(): MainUI
        {
            if (this._instance == null)
            {
                this._instance = new MainUI();
            }

            return this._instance;
        }

        //--------------------------------------------------------------------------------
        public static set instance(value: MainUI)
        {
            this._instance = value;
        }
    }
}