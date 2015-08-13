module Game {

    export class PanelCreate extends PanelCreateUI {

        public constructor()
        {
            super();
            this.name = "PanelCreate";
        }

        //--------------------------------------------------------------------------------
        public childrenCreated(): void
        {
            this.CREATED = true;
            this.update();
        }

        //--------------------------------------------------------------------------------
        public update(): void
        {
            this.updateNetData();
        }

        //--------------------------------------------------------------------------------
        public handleRole(e: NetEvent): void
        {
            this.updateNetData();
        }

        //--------------------------------------------------------------------------------
        private updateNetData(): void
        {

        }
    }
}