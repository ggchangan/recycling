import {createComponent} from 'spark-modula';
import {Link} from 'spark-link';
import './index.css';

export default createComponent({
    displayName: 'SuperAnalyticsHeader',
    render() {
        return (
            <div styleName="super-header">
                <Link>
                    <img src={require('./logo.png')} />
                </Link>
                <h1>Super Analytics</h1>
            </div>
        );
    }
});
