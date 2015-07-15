module game {
    export class Config {

        public STAGE_WIDTH: number;
        public STAGE_HEIGHT: number; 

        /** 
          * The types of language games 
          *@ param 0: "English"
          *@ param 1: "Chinese"
          */
        public LANGUAGE_TYPE: number;

        public constructor() {
            this.STAGE_WIDTH = 0;
            this.STAGE_HEIGHT = 0;

            this.LANGUAGE_TYPE = 0;
        }
    }
}