module Game {

    export class log extends egret.gui.SkinnableContainer{

        private mListLog: egret.gui.List;

        private mCollLog: egret.gui.ArrayCollection;



        private static instance: log;

        public constructor() {
            super();
        }

        //--------------------------------------------------------------------------------
        public MSG_LOG(msg:any): void {
            
            console.log(msg);
        }

        //--------------------------------------------------------------------------------
        public MSG_WARN(msg: any): void {

            console.warn(msg);
        }

        //--------------------------------------------------------------------------------
        public MSG_INFO(msg: any): void {

            console.info(msg);
        }

        //--------------------------------------------------------------------------------
        public MSG_ERROE(msg: any): void {

            console.error(msg);
        }

        //--------------------------------------------------------------------------------
        public static getInstance(): log {

            if (this.instance == null) {
                
                this.instance = new log();
            }

            return <log><any>(this.instance);
        }
    }
}