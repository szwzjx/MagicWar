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
                lang = "Game.ConstString_CN";
                conststring = egret.getDefinitionByName(lang);
            }
           
            if (conststring)
            {
                self.eNotWS = conststring.cNotWS;
                self.eFailedWS = conststring.cFailedWS;
            }
        }
    }
}