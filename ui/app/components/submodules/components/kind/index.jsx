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
                <div style={{fontSize: '0.8em'}}>{this.props.kind}</div>
                <div style={{marginBottom: '5%', fontSize: '0.4em'}}>{this.props.eKind}</div>
            </div>
        );
    }
});
