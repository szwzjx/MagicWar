module Game {

    export class PanelLogin extends PanelLoginUI {


        public constructor() {
            super();
        }

        //--------------------------------------------------------------------------------
        public partAdded(partName: string, instance: any): void
        {
            super.partAdded(partName, instance);
            //if (instance == this.list) {
            //}
        }

        //--------------------------------------------------------------------------------
        private adjustSize(): void
        {
            //this.scaleX = 
        }
    }
}