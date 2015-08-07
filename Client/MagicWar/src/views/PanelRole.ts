module Game {

    export class PanelRole extends PanelRoleUI {

        public constructor()
        {
            super();
            this.name = "PanelRole";
        }

        //--------------------------------------------------------------------------------
        public childrenCreated(): void
        {
            this.CREATED = true;
            this.update();
            NetCenter.instance.addEventListener(NetEvent.EVENT_ROLE, this.handleRole, this);
        }

        //--------------------------------------------------------------------------------
        public update(): void
        {
            this.updateNetData();
        }

        //--------------------------------------------------------------------------------
        public handleRole(e: NetEvent): void
        {
            this.updateNetData();
        }

        //--------------------------------------------------------------------------------
        private updateNetData(): void
        {
            this.UIA_head.source = Data.instance.mDRole.mHead;
            this.label_name.text = Data.instance.mDRole.mName;
            this.label_lv.text = "Lv." + Data.instance.mDRole.mLv.toString();
            this.label_coin.text = Data.instance.mDRole.mCoin.toString();
            this.label_diamond.text = Data.instance.mDRole.mDiamond.toString();
        }
    }
}