import {createModel} from 'spark-modula';

export default createModel({
    displayName: 'SideBarModel',
    eventTypes: [
        {
            type: 'toggleSideBar',
            payload: {}
        }
    ],
    sendToggleFoldBar() {
        this.bubbleEvent('toggleSideBar');
    }
});
