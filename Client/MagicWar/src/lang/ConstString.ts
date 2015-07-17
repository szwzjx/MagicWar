module Game {
    export class ConstString 
    {
        public static eNotWS: string = "Your browser does not support WebSocket!";

        public static eFailedWS: string = "Failed to create WebSocket!";

        public constructor()
        {

        }

        //--------------------------------------------------------------------------------
        public static ensureLang(lang:string): void
        {
            var self = this;
            var conststring = null;

            if (lang == "" || lang == "EN")
            {
                return;
            }
            else
            {
               // Game.ConstString_CN.cFailedWS;
                conststring = egret.getDefinitionByName("Game.ConstString_CN");
            }
           
            if (conststring)
            {
                self.eNotWS = conststring.eNotWS;
                self.eFailedWS = conststring.eFailedWS;
            }
        }
    }
}