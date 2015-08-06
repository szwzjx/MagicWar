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
            this.lable_name.text = Data.instance.mDRole.mName;
            this.lable_lv.text = Data.instance.mDRole.mLv.toString();
        }
    }
}