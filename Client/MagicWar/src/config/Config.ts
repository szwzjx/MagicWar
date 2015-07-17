module Game {
    export class Config {

        public STAGE_WIDTH: number;

        public STAGE_HEIGHT: number; 

        private static instance: Config;
        /** 
         * The types of language games 
         * @ type "EN" "CN"
         */
        public LANGUAGE_TYPE: string;

        public DEBUG: boolean;

        public constructor()
        {
            this.STAGE_WIDTH = 0;

            this.STAGE_HEIGHT = 0;

            this.LANGUAGE_TYPE = "CN";

            this.DEBUG = true;
        }

        //--------------------------------------------------------------------------------
        public static getInstance(): Config
        {
            if (this.instance == null)
            {
                this.instance = new Config();
            }

            return <Config><any>(this.instance);
        }
    }
}