import RootModel from './submodules/index_model';
import {contextSwitchRoute, simpleRoute, redirectRoute} from 'spark-router';
import DashboardModel from './submodules/components/dashboard/index_model';
import DetailModel from './submodules/components/detail/index_model';
import DeliveryModel from './submodules/components/delivery/index_model';
import ImpactModel from './submodules/components/impact/index_model';

const AppRoute = redirectRoute(
    [{path: '/', redirect: '/dashboard'}],
    contextSwitchRoute(RootModel, [
        {
            path: '/dashboard',
            propName: 'dashboard',
            route: simpleRoute(DashboardModel)
        },
        {
            path: '/detail',
            propName: 'detail',
            route: simpleRoute(DetailModel)
        },
        {
            path: '/delivery',
            propName: 'delivery',
            route: simpleRoute(DeliveryModel)
        },
        {
            path: '/impact',
            propName: 'impact',
            route: simpleRoute(ImpactModel)
        }
    ])
);

export default AppRoute;
