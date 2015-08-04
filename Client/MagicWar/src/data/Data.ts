module Game {
    export class Data {

        public mDRole: DRole;

        public static _instance: Data;

        public constructor() {
            this.mDRole = new DRole();
        }

        //--------------------------------------------------------------------------------
        public static set instance(value:Data)
        {
            this._instance = value;
        }

        //--------------------------------------------------------------------------------
        public static get instance(): Data
        {
            if (this._instance == null)
            {
                this._instance = new Data();
            }

            return <Data><any>(this._instance);
        }
    }
}