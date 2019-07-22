import {createComponent, PropTypes} from 'spark-modula';
import SideBarModel from './index_model';
import {Icon} from 'antd';
import {Link} from 'spark-link';
import logo from './logo.png';
import './index.css';
const pathList = [
    {
        icon: 'schedule',
        name: 'Dashboard',
        path: 'dashboard'
    },
    {
        icon: 'clock-circle',
        name: 'Reports Delivery',
        path: 'delivery'
    },
    {
        icon: 'profile',
        name: 'Report Detail',
        path: 'detail'
    },
    {
        icon: 'setting',
        name: 'Impact Analysis',
        path: 'impact'
    }
];

export default createComponent({
    displayName: 'SideBarComponent',
    propTypes: {
        path: PropTypes.string,
        foldSidebar: PropTypes.bool,
        model: PropTypes.instanceOf(SideBarModel)
    },
    render() {
        const {foldSidebar, model} = this.props;
        let width = foldSidebar ? '80px' : '360px';
        let styleName = foldSidebar ? 'fold' : '';
        let path = location.pathname;
        return (
            <div styleName="side-bar" style={{width: width}}>
                <span styleName="icon-menu" onClick={model.sendToggleFoldBar}>
                    <Icon
                        type={foldSidebar ? 'menu-unfold' : 'menu-fold'}
                        style={{color: '#4a4a4a', fontSize: '24px'}}
                    />
                </span>
                <div styleName={`web-title ${styleName}`}>
                    <img src={logo} alt="logo" styleName="logo" />
                    {foldSidebar ? null : <h1>Doraemon</h1>}
                    {foldSidebar ? null : <p>A oncall debug tool that make your life better</p>}
                </div>
                <ul>
                    {pathList.map(item => {
                        return (
                            <li key={item.path} styleName={path.indexOf(item.path) > -1 ? 'current' : ''}>
                                <Link href={item.path}>
                                    <Icon type={item.icon} style={{fontSize: '18px'}} />
                                    {foldSidebar ? null : <p>{item.name}</p>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});
