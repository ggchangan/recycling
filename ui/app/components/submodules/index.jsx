import {createComponent, PropTypes} from 'spark-ui/lib/spark-modula';
import RootModel from './index_model';
import DashboardComponent from './components/dashboard';
import SideBarComponent from './components/sidebar';
import DetailComponent from './components/detail';
import DeliveryComponent from './components/delivery';
import ImpactComponent from './components/impact';
import Loading from './components/loading';

const RootComponent = createComponent({
    displayName: 'RootComponent',
    propTypes: {
        model: PropTypes.instanceOf(RootModel)
    },
    getInitialState() {
        return {
            height: window.innerHeight
        };
    },
    componentWillMount() {
        window.onresize = () => {
            this.setState({
                height: window.innerHeight
            });
        };
    },
    render() {
        const {model} = this.props;
        const isLoading = model.get('isLoading');
        return (
            <div className="container" style={{height: this.state.height + 'px'}}>
                <SideBarComponent
                    path={model.get('path')}
                    foldSidebar={model.get('foldSidebar')}
                    model={model.get('sidebar')}
                />
                <div className="content">
                    {isLoading ? <Loading /> : null}
                    {model.get('dashboard') && (
                        <DashboardComponent model={model.get('dashboard')} foldSidebar={model.get('foldSidebar')} />
                    )}
                    {model.get('detail') && (
                        <DetailComponent model={model.get('detail')} foldSidebar={model.get('foldSidebar')} />
                    )}
                    {model.get('delivery') && (
                        <DeliveryComponent model={model.get('delivery')} foldSidebar={model.get('foldSidebar')} />
                    )}
                    {model.get('impact') && <ImpactComponent model={model.get('impact')} />}
                </div>
            </div>
        );
    }
});

export default RootComponent;
