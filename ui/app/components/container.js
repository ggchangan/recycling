/* global HEADER_URL */
import {withFetchModel, withFetchComponent} from 'spark-fetch';
import {createContainer} from 'spark-modula';
import {withGettextModel, withGettextComponent} from 'spark-ui/lib/spark-gettext';
import {withContextModel, withContextComponent} from 'spark-ui/lib/biz-context';
import {withGlobalExceptionModel, withGlobalExceptionComponent} from 'spark-global-exception';
import {withRouterComponent, withRouterModel} from 'spark-router';
import {NotFoundComponent} from 'biz-app';
import {browserHistory} from 'react-router';
import AppRoute from './router';
import extraResourcesAPI from '../utils/resources';
import RootComponent from './submodules/index';
import RootModel from './submodules/index_model';

const App = createContainer(
    withFetchModel({
        resourcesEndpoint: HEADER_URL || '/analytics/api/discover?module=analytics',
        theFetch: window.fetch,
        extraResources: extraResourcesAPI
    })(
        withContextModel(
            withGettextModel(
                withGlobalExceptionModel()(withRouterModel(AppRoute, browserHistory, '/')(RootModel)),
                true
            )
        )
    ),
    withFetchComponent(
        withContextComponent(
            withGettextComponent(withGlobalExceptionComponent(withRouterComponent(NotFoundComponent)(RootComponent)))
        )
    ),
    window.devToolsExtension ? window.devToolsExtension() : undefined
);
export default App;
