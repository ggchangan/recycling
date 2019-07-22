import {createComponent} from 'spark-modula';
import {DatePicker, Input, Button, Table, Select} from 'antd';

import moment from 'moment-timezone';
import Title from '../title';
import './index.css';

export default createComponent({
    displayName: 'ImpactComponent',
    renderTable(model) {
        let data = model.get('reports').toJS();
        let columns = this.getColumns();
        return <Table columns={columns} dataSource={data} rowKey={record => record.reportId} />;
    },

    render() {
        const {model} = this.props;
        const timezone = model.get('timezone');
        const {Option} = Select;
        return (
            <div style={{position: 'relative'}}>
                <Title title="Search impacted Timezone/Network and Date" />
                <div styleName="flex-container">
                    <Select
                        style={{width: 200}}
                        placeholder="Input Timezone Name"
                        allowClear={true}
                        value={model.get('searchParams').get('timezoneName')}
                        onChange={value => model.sendChangeTimezone(value)}
                    >
                        <Option value="America/New_York">America/New_York</Option>
                        <Option value="America/Los_Angeles">America/Los_Angeles</Option>
                        <Option value="Australia/Melbourne">Australia/Melbourne</Option>
                        <Option value="CET">CET</Option>
                        <Option value="EET">EET</Option>
                        <Option value="ETC/GMT">ETC/GMT</Option>
                        <Option value="Europe/London">Europe/London</Option>
                    </Select>
                    <Input
                        placeholder="Input Network ID"
                        value={model.get('searchParams').get('networkID')}
                        onChange={e => model.sendChangeNetworkID(e, 'networkID')}
                    />
                    <DatePicker
                        defaultValue={moment.tz(timezone)}
                        format="YYYY-MM-DD"
                        styleName="datePicker"
                        allowClear={false}
                        onChange={(date, str) => this.changeDate(date, str)}
                    />
                    <div>
                        <Button
                            style={{width: '132px', height: '30px', margin: '10px', marginLeft: '30px', float: 'right'}}
                            type="primary"
                            icon="search"
                            disabled={!model.checkParams()}
                            onClick={() => model.sendSearch()}
                        >
                            Search
                        </Button>
                    </div>
                </div>
                <div styleName="report-table">
                    <Title title="Scheduled Reports Published Later Than 9AM" />
                    <Button
                        styleName="export-button"
                        type="primary"
                        icon="download"
                        disabled={!model.checkResult()}
                        onClick={this.exportCSV}
                    >
                        Export
                    </Button>
                    {this.renderTable(model)}
                </div>
            </div>
        );
    },
    getColumns() {
        let columns = [
            {
                title: 'Report ID',
                dataIndex: 'reportId',
                key: 'reportId'
            },

            {
                title: 'Network ID',
                dataIndex: 'networkId',
                key: 'networkId'
            },
            {
                title: 'User Name',
                dataIndex: 'userName',
                key: 'userName'
            },
            {
                title: 'Report Name',
                dataIndex: 'reportName',
                key: 'reportName'
            },
            {
                title: 'FTP File Format',
                dataIndex: 'ftpFileFormat',
                key: 'ftpFileFormat'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: 'Delivered Time',
                dataIndex: 'deliveredTime',
                key: 'deliveredTime'
            }
        ];
        return columns;
    },
    changeDate(date, str) {
        const {model} = this.props;
        model.sendChangeDate(str);
    },
    exportCSV() {
        const {model} = this.props;
        const searchParams = model.get('searchParams');
        let timezone = searchParams.get('timezoneName');
        if (timezone === undefined) {
            timezone = '';
        }
        const networkID = searchParams.get('networkID');
        const eventDate = model.get('date');
        window.open(
            `/doraemon/api/impact/export?timezone=${timezone}&networkID=${networkID}&eventDate=${eventDate}`,
            '_blank'
        );
    }
});
