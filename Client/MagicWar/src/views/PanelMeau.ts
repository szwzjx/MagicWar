module Game {

    export class PanelMeau extends PanelMeauUI {

        public constructor()
        {
            super();
            this.name = "PanelMeau";
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