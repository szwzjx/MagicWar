module Game {
    export class GamePanel  extends egret.gui.SkinnableContainer implements IPanel {
        
        public constructor() {
            super();
            this.width = Game.Config.getInstance().STAGE_WIDTH;
            this.height = Game.Config.getInstance().STAGE_HEIGHT;
        }

        //--------------------------------------------------------------------------------
        public openPanel(): void
        {

        }

        //--------------------------------------------------------------------------------
        public update(): void
        {

        }

        //--------------------------------------------------------------------------------
        public closePanel(): void
        {

        }

        //--------------------------------------------------------------------------------
        public destPanel(): void
        {

        }
    }
}