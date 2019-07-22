import {createModel, PropTypes, createConstants} from 'spark-modula';
import DashboardModel from './components/dashboard/index_model';
import DetailModel from './components/detail/index_model';
import DeliveryModel from './components/delivery/index_model';
import ImpactModel from './components/impact/index_model';
import SideBarModel from './components/sidebar/index_model';

export const ActionTypes = createConstants('ROOT', {
    LOAD_DATA: null,
    TOGGLE_SIDE_BAR: null,
    HIDE_LOADING: null,
    SHOW_LOADING: null
});

export default createModel({
    displayName: 'RootModel',
    propTypes: {
        dashboard: PropTypes.instanceOf(DashboardModel),
        detail: PropTypes.instanceOf(DetailModel),
        delivery: PropTypes.instanceOf(DeliveryModel),
        impact: PropTypes.instanceOf(ImpactModel),
        sidebar: PropTypes.instanceOf(SideBarModel),
        path: PropTypes.string,
        foldSidebar: PropTypes.bool,
        isLoading: PropTypes.bool
    },
    defaults: {
        dashboard: null,
        detail: null,
        delivery: null,
        impact: null,
        path: 'dashboard',
        foldSidebar: false,
        isLoading: true,
        sidebar: () => new SideBarModel()
    },
    contextTypes: {
        fetchResource: PropTypes.func.isRequired,
        handleGlobalException: PropTypes.func.isRequired
    },
    watchEventTypes: ['toggleSideBar', 'hideLoading', 'showLoading'],
    watchEvent(type) {
        if (type === 'toggleSideBar') {
            this.sendToggleSideBar();
        } else if (type === 'hideLoading') {
            this.sendHideLoading();
        } else if (type === 'showLoading') {
            this.sendShowLoading();
        }
    },
    sendToggleSideBar() {
        this.dispatch({
            type: ActionTypes.TOGGLE_SIDE_BAR
        });
    },
    recvToggleSideBar() {
        return {
            type: ActionTypes.TOGGLE_SIDE_BAR,
            update(model) {
                return [model.set('foldSidebar', !model.get('foldSidebar'))];
            }
        };
    },
    sendHideLoading() {
        this.dispatch({
            type: ActionTypes.HIDE_LOADING
        });
    },
    recvHideLoading() {
        return {
            type: ActionTypes.HIDE_LOADING,
            update(model) {
                return [model.set('isLoading', false)];
            }
        };
    },
    sendShowLoading() {
        this.dispatch({
            type: ActionTypes.SHOW_LOADING
        });
    },
    recvShowLoading() {
        return {
            type: ActionTypes.SHOW_LOADING,
            update(model) {
                return [model.set('isLoading', true)];
            }
        };
    }
});
