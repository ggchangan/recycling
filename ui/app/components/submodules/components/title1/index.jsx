import {createComponent, PropTypes} from 'spark-modula';
import {Icon} from 'antd';
import './index.css';

export default createComponent({
    displayName: 'Title1',
    propTypes: {
        title: PropTypes.string.isRequired
    },
    render() {
        return (
            <div styleName="title">
                <Icon type="left" style={{position: 'absolute', left: '0px', top: '6px'}} />
                {this.props.title}
            </div>
        );
    }
});
