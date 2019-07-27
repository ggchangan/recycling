import {createComponent, PropTypes} from 'spark-modula';
import './index.css';

export default createComponent({
    displayName: 'Description',
    propTypes: {
        kind: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    },
    render() {
        return (
            <div styleName="description">
                <div style={{fontSize: '1.2em'}}>{this.props.kind}</div>
                <span
                    style={{
                        display: 'inline-block',
                        width: '60px',
                        height: '2px',
                        backgroundColor: '#FFFFFF',
                        position: 'relative',
                        top: '-6px'
                    }}
                />
                <div style={{fontSize: '1.0em'}}> {this.props.description}</div>
            </div>
        );
    }
});
