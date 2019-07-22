import {createComponent} from 'spark-modula';
import loadingIcon from './loading.svg';
import './index.css';

export default createComponent({
    displayName: 'Loading',
    render() {
        return (
            <div styleName="loading" className="row">
                <img src={loadingIcon} alt="loading" />
            </div>
        );
    }
});
