module Game {
    /**Main Events.*/
    export class NetEvent extends egret.Event {

        public static EVENT_ROLE: string = "EventRole";

        public mParam: any;

        public constructor(type: string, mParam: any, bubbles: boolean = false, cancelable: boolean = false) {
            super(type, bubbles, cancelable);
            this.mParam = mParam;
        }
    }
}