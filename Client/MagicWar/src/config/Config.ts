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

        public MAGICWAR_IP: string;

        public MAGUCWAR_PORT; number;

        public VERSION: string

        private static instance: Config;

        public constructor()
        {
            this.STAGE_WIDTH = 0;

            this.STAGE_HEIGHT = 0;

            this.LANGUAGE_TYPE = "CN";

            this.DEBUG = false;

            this.MAGICWAR_IP = "127.0.0.1";

            this.MAGUCWAR_PORT = 5688;

            this.VERSION = "0.0.1";
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