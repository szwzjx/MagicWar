module Game {
    export class GameUI extends egret.gui.UIStage{

        public PANEL_ALL: Object;

        public PANEL_NAME: string[];

        public runtimeClass: RuntimeClass;

        public static _instance: GameUI;

        public constructor()
        {
            super();
            this.PANEL_ALL = [];
            this.PANEL_NAME = [];
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            this.manage_panel("PanelLogin","open");
        }

        /**
         * @ name: panelName
         * @ action: "open" or "close"
         */
        //--------------------------------------------------------------------------------
        public manage_panel(name:string,action:string): void
        {
            var self = this;
            var panel = self.PANEL_ALL[name];
            
            if (!panel)
            {
                var classname = "Game." + name;
                var panelClass = egret.getDefinitionByName(classname);

                if (panelClass)
                {
                    panel = new panelClass;
                    self.PANEL_ALL[name] = panel;
                }
                else
                {
                    Log.L.ERROE(name + " is not found!");
                    return;
                }
            }

            if (panel)
            {
                if (action == "open")
                {
                    if (!self.contains(panel))
                    {
                        self.addElement(panel);

                        if (panel.CREATED)
                        {
                            panel.update();
                        }
                    }
                }
                else if(action == "close")
                {
                    if (panel.parent && panel.parent.contains(panel))
                    {
                        panel.parent.removeElement(panel);
                    }
                    else
                    {
                        Log.L.ERROE("error: close " + name);
                    }
                }
            }
        }

        //--------------------------------------------------------------------------------
        public static get instance(): GameUI
        {
            if (this._instance == null)
            {
                this._instance = new GameUI();
            }

            return this._instance;
        }

        //--------------------------------------------------------------------------------
        public static set instance(value:GameUI)
        {
            this._instance = value;
        }
    }
}