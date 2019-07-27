import {createComponent, PropTypes} from 'spark-modula';
import './index.css';

export default createComponent({
    displayName: 'Kind',
    propTypes: {
        kind: PropTypes.string.isRequired,
        eKind: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired
    },
    render() {
        return (
            <div styleName="kind">
                <div>
                    <img src={this.props.logo}></img>
                </div>
                <div>{this.props.kind}</div>
                <div>{this.props.eKind}</div>
            </div>
        );
    }
});
