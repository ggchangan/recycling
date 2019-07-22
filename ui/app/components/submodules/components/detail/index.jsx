import {createComponent, PropTypes} from 'spark-modula';
import DetailModel from './index_model';
import {Input, Button, Table, Icon, message} from 'antd';
import Highlight from 'react-highlight';
import Title from '../title';
import './index.css';

export default createComponent({
    displayName: 'DetailComponent',
    propTypes: {
        model: PropTypes.instanceOf(DetailModel),
        foldSidebar: PropTypes.bool
    },
    renderSearchPanel() {
        const {model} = this.props;
        const searchParams = model.get('searchParams');
        const networkID = searchParams.get('networkID');
        const createUser = searchParams.get('createUser');
        const reportName = searchParams.get('reportName');
        let searchEnabled = false;
        if (networkID !== '' || createUser !== '' || reportName !== '') {
            searchEnabled = true;
        }

        return (
            <div styleName="flex-container">
                <Input placeholder="Input Network ID" onChange={e => model.sendChangeNetworkID(e, 'networkID')} />
                <Input placeholder="Input User Name" onChange={e => model.sendChangeCreateUser(e, 'createUser')} />
                <Input placeholder="Input Report Name" onChange={e => model.sendChangeReportName(e, 'reportName')} />
                <div>
                    {searchEnabled ? (
                        <Button
                            style={{width: '132px', height: '40px', margin: '10px'}}
                            type="primary"
                            icon="search"
                            onClick={() => model.sendSearch()}
                        >
                            Search
                        </Button>
                    ) : (
                        <Button
                            disabled
                            style={{width: '132px', height: '40px', margin: '10px'}}
                            type="primary"
                            icon="search"
                            onClick={() => model.sendSearch()}
                        >
                            Search
                        </Button>
                    )}
                </div>
            </div>
        );
    },
    renderSearchResult() {
        const {model} = this.props;
        const dataSet = model.get('foundReports').toJS();
        const columns = [
            {
                title: 'Network ID',
                dataIndex: 'networkID',
                key: 'networkID'
            },
            {
                title: 'Create User',
                dataIndex: 'createUser',
                key: 'createUser'
            },
            {
                title: 'Report Name',
                dataIndex: 'reportName',
                key: 'reportName'
            },
            {
                title: 'Updated At',
                dataIndex: 'updatedAt',
                key: 'updatedAt'
            }
        ];
        return (
            <div>
                <Table dataSource={dataSet} columns={columns} rowClassName={this.setRowClassName} onRow={this.onRow} />
            </div>
        );
    },
    renderReportDetails() {
        return (
            <div>
                <div styleName="title">Dimensions</div>
                {this.renderDimension()}
                <div styleName="title">Metrics</div>
                {this.renderMetric()}
                <div styleName="title">Filters</div>
                {this.renderFilter()}
                <div styleName="title">Date Range && Aggregation</div>
                {this.renderDateRange()}
                {this.renderSqlPanel()}
            </div>
        );
    },
    renderDimension() {
        const {model} = this.props;
        let dimensions = model
            .get('reportDetail')
            .get('dimension')
            .toJS();
        return (
            <div styleName="flex-container">
                {dimensions.map((value, index) => {
                    return (
                        <Button style={{margin: '5px'}} key={index}>
                            {value}
                        </Button>
                    );
                })}
            </div>
        );
    },
    renderMetric() {
        const {model} = this.props;
        let metrics = model
            .get('reportDetail')
            .get('metric')
            .toJS();
        return (
            <div styleName="flex-container">
                {metrics.map((value, index) => {
                    return (
                        <Button style={{margin: '5px'}} key={index}>
                            {value}
                        </Button>
                    );
                })}
            </div>
        );
    },
    renderFilter() {
        const {model} = this.props;
        let filter = model.get('reportDetail').get('filter');

        return <div styleName="flex-container">{filter}</div>;
    },
    renderDateRange() {
        const {model} = this.props;
        let dateRange = model.get('reportDetail').get('dateRange');
        return <div>{dateRange}</div>;
    },
    renderSqlPanel() {
        const {foldSidebar} = this.props;
        const left = foldSidebar ? '80px' : '360px';
        const {model} = this.props;
        let sqlShow = model.get('sqlShow');
        return (
            <div styleName="float" style={{left: left}}>
                <div styleName="hide-icon">
                    <span onClick={() => model.sendSqlShow()}>
                        {sqlShow ? <Icon type="caret-down" /> : <Icon type="caret-up" />}
                    </span>
                </div>
                {this.renderSqlContent()}
            </div>
        );
    },
    renderSqlContent() {
        const {model} = this.props;
        let sql = model.get('reportDetail').get('sql');
        let sqlShow = model.get('sqlShow');
        if (!sqlShow) {
            return null;
        }
        return (
            <div style={{paddingLeft: '44px', paddingRight: '44px', paddingBottom: '32px', paddingTop: '0px'}}>
                <div styleName="flex-sql">
                    <div styleName="title">SQL</div>
                    <div style={{float: 'right'}}>
                        <Button style={{marginTop: '10px', float: 'right'}} type="primary" onClick={this.copySql}>
                            Copy
                        </Button>
                    </div>
                </div>
                <div style={{overflow: 'auto', maxHeight: '200px'}}>
                    <Highlight className="sql">{sql}</Highlight>
                    <Input style={{opacity: '0'}} value={sql} ref={sqlContent => (this.sqlContent = sqlContent)} />
                </div>
            </div>
        );
    },
    render() {
        const {model} = this.props;
        let detail = model.get('reportDetail');
        let sqlShow = model.get('sqlShow');
        let padding = sqlShow ? '326px' : '32px';
        return (
            <div style={{position: 'relative', paddingBottom: padding}}>
                <Title title="Search Reports" />
                {this.renderSearchPanel()}
                <Title title="Report List" />
                {this.renderSearchResult()}
                {detail.isEmpty() ? null : <Title title="Report Details" />}
                {detail.isEmpty() ? null : this.renderReportDetails()}
            </div>
        );
    },
    copySql() {
        this.sqlContent.select();
        document.execCommand('Copy');
        message.success('SQL copied!');
    },
    onRow(record) {
        const {model} = this.props;
        return {
            onClick: () => {
                model.sendSelectRow(record.reportID, record.createUser);
            }
        };
    },
    setRowClassName(record) {
        const {model} = this.props;
        return record.reportID === model.get('reportID') ? 'table-clicked-row-style' : '';
    }
});
