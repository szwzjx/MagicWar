module game {
    export class Config {

        public STAGE_WIDTH: number;

        public STAGE_HEIGHT: number; 

        /** 
          * The types of language games 
          *@ param "EN" "CN"
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
    }
}