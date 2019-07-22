import {createComponent, PropTypes} from 'spark-modula';
import './index.css';

export default createComponent({
    displayName: 'Title',
    propTypes: {
        title: PropTypes.string.isRequired
    },
    render() {
        return (
            <div styleName="title">
                <span />
                {this.props.title}
            </div>
        );
    }
});
