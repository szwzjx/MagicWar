//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    private loadingView: LoadingUI;

    private gameLayer: egret.DisplayObjectContainer;

    private guiLayer: egret.gui.UIStage;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    //--------------------------------------------------------------------------------
    private onAddToStage(event: egret.Event) {

        Game.Config.getInstance().STAGE_WIDTH = this.stage.stageWidth;
        Game.Config.getInstance().STAGE_HEIGHT = this.stage.stageHeight;

        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        egret.gui.Theme.load("resource/theme.thm");

        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    //--------------------------------------------------------------------------------
    private onConfigComplete(event: RES.ResourceEvent): void {

        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.getResAsync("config_json", this.handleConfig, this);
    }

    //--------------------------------------------------------------------------------
    private handleConfig(result: Array<any>): void {

        if (result) {

            Game.Config.getInstance().LANGUAGE_TYPE = result["language"];
            Game.Config.getInstance().DEBUG = result["debug"];
            Game.Config.getInstance().MAGICWAR_IP = result["ip"];
            Game.Config.getInstance().MAGUCWAR_PORT = result["port"];
            Game.Config.getInstance().VERSION = result["version"];

            Game.ConstString.ensureLang(Game.Config.getInstance().LANGUAGE_TYPE);

            console.log("MAGICWAR VERSION: " + Game.Config.getInstance().VERSION);
        }

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    //--------------------------------------------------------------------------------
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
        }
    }

    //--------------------------------------------------------------------------------
    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }

    //--------------------------------------------------------------------------------
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    //--------------------------------------------------------------------------------
    private createScene():void {

        egret.Profiler.getInstance().run();

        this.gameLayer = new egret.DisplayObjectContainer();
        this.addChild(this.gameLayer);

        this.guiLayer = new egret.gui.UIStage();
        this.addChild(this.guiLayer);

        var bitmap:egret.Bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes("bgImage");
        bitmap.width = this.stage.stageWidth;
        bitmap.height = this.stage.stageHeight;
        this.gameLayer.addChild(bitmap);
    }
}


