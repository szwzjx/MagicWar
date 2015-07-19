module Game {
    export class Config {

        public STAGE_WIDTH: number;

        public STAGE_HEIGHT: number; 
        
        /** 
         * The types of language games 
         * @ type "EN" "CN"
         */
        public LANGUAGE_TYPE: string;

        public DEBUG: boolean;

        public static MAGICWAR_IP = "127.0.0.1";

        public static MAGUCWAR_PORT = 5668;

        private static instance: Config;

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