import {createComponent, PropTypes} from 'spark-modula';
import DeliveryModel from './index_model.js';
import './index.css';
import Title from '../title';
import {FloatToTime} from '../../../../utils/index.js';

import {Button, Input, Table, Tag} from 'antd';

const {Column} = Table;

import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

export default createComponent({
    displayName: 'DeliveryComponent',
    propTypes: {
        model: PropTypes.instanceOf(DeliveryModel).isRequired,
        foldSidebar: PropTypes.bool
    },

    renderSearchPanel() {
        const {model} = this.props;
        return (
            <div styleName="search-panel">
                <div styleName="search-input">
                    <Input
                        placeholder="Input Network ID"
                        value={model.get('networkID')}
                        onChange={e => {
                            model.sendInputChange('networkID', e.target.value);
                        }}
                    />
                </div>
                <div styleName="search-input">
                    <Input
                        placeholder="Input User Name"
                        value={model.get('creator')}
                        onChange={e => {
                            model.sendInputChange('creator', e.target.value);
                        }}
                    />
                </div>
                <div styleName="search-input">
                    <Input
                        placeholder="Input Report Name"
                        value={model.get('reportName')}
                        onChange={e => {
                            model.sendInputChange('reportName', e.target.value);
                        }}
                    />
                </div>
                <div styleName="search-btn">
                    <Button
                        type="primary"
                        icon="search"
                        onClick={() => {
                            model.sendSearch();
                        }}
                        disabled={!model.checkParams()}
                    >
                        Search
                    </Button>
                </div>
            </div>
        );
    },

    renderSearchResult() {
        const {model} = this.props;
        const dataSet = model.get('foundReports').toJS();
        return (
            <div>
                <Table dataSource={dataSet} rowClassName={this.setRowClassName} onRow={this.onRow}>
                    <Column title="ID" dataIndex="reportID" key="reportID" />
                    <Column title="Network ID" dataIndex="networkID" key="networkID" />
                    <Column title="Create User" dataIndex="createUser" key="createUser" />
                    <Column title="Report Name" dataIndex="reportName" key="reportName" />
                    <Column title="Recurrence Range" dataIndex="recurrenceRange" key="recurrenceRange" />
                    <Column title="Recurrence Type" dataIndex="recurrenceType" key="recurrenceType" />
                    <Column title="Delivery Methods" dataIndex="deliveryMethods" key="deliveryMethods" />
                    <Column
                        title="Email List"
                        dataIndex="emailList"
                        key="emailList"
                        render={emailList => (
                            <span>
                                {emailList.map(email => (
                                    <Tag color="blue" key={email}>
                                        {email}
                                    </Tag>
                                ))}
                            </span>
                        )}
                    />
                </Table>
            </div>
        );
    },
    renderDeliveryStatus() {
        const {model} = this.props;
        const sentEmailRecords = model.get('email').toJS();
        const finishTime = model.get('finishTime').toJS();
        if (model.get('reportID') === -1) {
            return null;
        }
        return (
            <div>
                <div styleName="delivery-chart">
                    <p styleName="chart-title">Delivery Time Trend (Local timezone)</p>
                    <XYPlot margin={{bottom: 70}} xType="ordinal" width={this.getContentWidth()} height={400}>
                        <HorizontalGridLines left={60} />
                        <XAxis
                            title="Event date"
                            style={{
                                text: {stroke: 'none', fill: '#6b6b76'}
                            }}
                        />
                        <YAxis
                            style={{
                                text: {stroke: 'none', fill: '#6b6b76'}
                            }}
                            tickSize={3}
                            width={60}
                            tickFormat={v => {
                                return FloatToTime(v) + 'AM';
                            }}
                        />
                        <LineSeries
                            style={{
                                strokeWidth: 3,
                                stroke: '#42BCF9'
                            }}
                            margin={{left: 60}}
                            data={finishTime}
                        />
                    </XYPlot>
                </div>
                <div styleName="delivery-chart">
                    <p styleName="chart-title">Send Email History</p>
                    <Table dataSource={sentEmailRecords}>
                        <Column title="Index" dataIndex="index" key="index" />
                        <Column title="Receiver" dataIndex="receiver" key="receiver" />
                        <Column title="Date" dataIndex="date" key="date" />
                        <Column title="Sent Time" dataIndex="sentTime" key="sentTime" />
                    </Table>
                </div>
            </div>
        );
    },

    render() {
        const {model} = this.props;
        const reportID = model.get('reportID');
        return (
            <div>
                <Title title="Search Reports" />
                <div>{this.renderSearchPanel()}</div>
                <Title title="Reports" />
                <div>{this.renderSearchResult()}</div>
                {reportID === -1 ? null : <Title title="Report Delivery Status" />}
                {reportID === -1 ? null : <div>{this.renderDeliveryStatus()}</div>}
            </div>
        );
    },

    onRow(record) {
        const {model} = this.props;
        return {
            onClick: () => {
                model.sendSelectRow(record.reportID);
            }
        };
    },

    setRowClassName(record) {
        const {model} = this.props;
        return record.reportID === model.get('reportID') ? 'table-clicked-row-style' : '';
    },

    getContentWidth() {
        let foldSidebar = this.props.foldSidebar;
        let sideBarWidth = foldSidebar ? 80 : 360;
        let width = window.innerWidth - sideBarWidth - 100;
        return width;
    },

    finishTimeTickFormat(value) {
        return <div>{value} AM</div>;
    }
});
