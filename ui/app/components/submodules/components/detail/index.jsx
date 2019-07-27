import {createComponent, PropTypes} from 'spark-modula';
import DetailModel from './index_model';
import {Button} from 'antd';
import Title1 from '../title1';
import './index.css';
import logo from './Recyclable.png';
import Kind from '../kind';
import Description from '../description';

export default createComponent({
    displayName: 'DetailComponent',
    propTypes: {
        model: PropTypes.instanceOf(DetailModel),
        foldSidebar: PropTypes.bool
    },
    renderTitle() {
        const {model} = this.props;
        const kind = model.get('kind');
        return (
            <div style={{marginBottom: '5px'}}>
                <Title1 title={kind} />
            </div>
        );
    },
    renderGarbageRow(row, index) {
        return (
            <div styleName="flex-row" key={index}>
                {row.map((ele, i) => {
                    return (
                        <Button shape="round" key={i} styleName={i === 0 ? 'zero' : 'one'}>
                            {ele}
                        </Button>
                    );
                })}
            </div>
        );
    },
    renderGarbages() {
        const {model} = this.props;
        const garbages = model.get('garbages').toJS();
        const step = 2;
        let table = new Array();
        for (let index = 0; index < garbages.length; index += step) {
            let col = new Array();
            for (let j = 0; j < step; j++) {
                col[j] = garbages[index + j];
            }
            table[index / step] = col;
        }
        return (
            <div>
                {table.map((row, i) => {
                    return <div key={i}>{this.renderGarbageRow(row, i)}</div>;
                })}
            </div>
        );
    },
    renderKind() {
        const {model} = this.props;
        const kind = model.get('kind');
        const eKind = model.get('eKind');
        return <Kind kind={kind} eKind={eKind} logo={logo} />;
    },
    renderKindDescription() {
        const {model} = this.props;
        const kind = model.get('kind');
        const description = model.get('description');
        return <Description kind={kind} description={description} />;
    },
    renderHeader() {
        return (
            <div style={{position: 'relative'}}>
                <div
                    styleName="flex-container"
                    style={{
                        backgroundColor: 'rgb(41, 82, 136)',
                        color: '#FFFFFF'
                    }}
                >
                    {this.renderKind()}
                    {this.renderKindDescription()}
                </div>
            </div>
        );
    },
    render() {
        return (
            <div style={{width: '50%', margin: 'auto'}}>
                {this.renderKind()}
                {this.renderKindDescription()}
                {this.renderTitle()}
                {this.renderHeader()}
                {this.renderGarbages()}
            </div>
        );
    }
});
