module Game {
    export class PlayerLayer extends egret.Sprite {

        private mc: egret.MovieClip;

        private mcf: egret.MovieClipDataFactory;

        private timer: egret.Timer;//默认1秒

        private dd: number = 1;

        public constructor() {
            super();
        }

        //--------------------------------------------------------------------------------
        public start(): void
        {
            var data = RES.getRes("run_json");
            var res = RES.getRes("run_png");

            this.mcf = new egret.MovieClipDataFactory(data, res);
            this.mc = new egret.MovieClip(this.mcf.generateMovieClipData("run"));
            this.addChild(this.mc);
            this.mc.gotoAndStop(9);
           // this.mc.play(-1);
            
            this.timer = new egret.Timer(1000 /32);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onRoleTimer, this);
           // this.timer.start();
        }
        

        //--------------------------------------------------------------------------------
        private onRoleTimer(evt: egret.Event): void {

            this.dd = this.dd > 12 ? 1 : this.dd;
           // Game.Log.getInstance().MSG_INFO(this.dd);
            this.mc.gotoAndStop(this.dd);
            this.dd++;
        }
    }
}