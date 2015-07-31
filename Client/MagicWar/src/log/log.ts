module Game {

    export class Log extends egret.DisplayObjectContainer{

        private mScrollView: egret.ScrollView;

        private mTextLog: egret.TextField;

        private static instance: Log;

        public constructor() {
            super();
            this.init();
        }

        //--------------------------------------------------------------------------------
        private init(): void
        {
            var W: number = Config.getInstance().STAGE_WIDTH;
            var H: number = Config.getInstance().STAGE_HEIGHT;

            var bg: egret.Shape = new egret.Shape();
            bg.graphics.beginFill(0x000000, 0.7);
            bg.graphics.drawRect(0, 0, W, H);
            bg.graphics.endFill();
            this.addChild(bg);

            this.mTextLog = new egret.TextField();
            this.mTextLog.width = W;
            this.mTextLog.size = 24;

            this.mScrollView = new egret.ScrollView(this.mTextLog);
            this.mScrollView.width = W;
            this.mScrollView.height = H;
            this.addChild(this.mScrollView);
        }

        //--------------------------------------------------------------------------------
        private updateLog(msg: any, color: any): void
        {
            msg += "\n";
            this.mTextLog.textFlow.push({ text: msg, style: { "textColor": color} });
            this.mTextLog.textFlow = <Array<egret.ITextElement>>this.mTextLog.textFlow;
        }

        //--------------------------------------------------------------------------------
        public LOG(msg: any, value: boolean = false): void
        {
            console.log(msg);

            if (!value)
            {
                this.updateLog(msg,0xFFFFFF);
            }
        }

        //--------------------------------------------------------------------------------
        public WARN(msg: any, value: boolean = false): void
        {
            console.warn(msg);

            if (!value)
            {
                this.updateLog(msg, 0xCCCCCC);
            }
        }

        //--------------------------------------------------------------------------------
        public INFO(msg: any, value: boolean = false): void
        {
            console.info(msg);

            if (!value)
            {
                this.updateLog(msg, 0x00FF00);
            }
        }

        //--------------------------------------------------------------------------------
        public ERROE(msg: any, value: boolean = false): void
        {
            console.error(msg);

            if (!value)
            {
                this.updateLog(msg, 0xFF0000);
            }
        }

        //--------------------------------------------------------------------------------
        public static L(): Log
        {
            if (this.instance == null) {
                
                this.instance = new Log();
            }

            return <Log><any>(this.instance);
        }
    }
}