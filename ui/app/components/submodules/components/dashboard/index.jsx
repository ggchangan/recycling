import {createComponent} from 'spark-modula';
import {DatePicker, Icon, Radio, Table, Tag, Divider} from 'antd';
import {Hint, RadialChart} from 'react-vis';
import {Link} from 'spark-link';
import moment from 'moment-timezone';
import Title from '../title';
import './index.css';

const colors = {
    success: 'green',
    running: 'orange',
    waiting: '#999',
    fail: 'red'
};

export default createComponent({
    displayName: 'DashboardComponent',
    renderTimeline(model) {
        const timezone = model.get('timezone');
        let currentTime = moment.tz(timezone);
        let hour = currentTime.hour();
        let minutes = currentTime.minute();
        let leftPosition = this.getLeftPosition(hour, minutes);
        let foldSidebar = this.props.foldSidebar;
        let sideBarWidth = foldSidebar ? 80 : 360;
        let width = window.innerWidth - sideBarWidth - 60;
        let currentWordStyle = {left: '-85px'};
        if (width - leftPosition <= 200) {
            currentWordStyle = {right: leftPosition - width + 'px'};
        } else if (leftPosition < 85) {
            currentWordStyle = {left: leftPosition - 85 + 'px'};
        }
        return (
            <div styleName="time-current" key="time-current" style={{left: leftPosition + 'px'}}>
                <span style={currentWordStyle}>current time: {currentTime.format('HH:mm z')}</span>
            </div>
        );
    },
    renderPreTask(model) {
        let left5 = this.getLeftPosition(5);
        let foldSidebar = this.props.foldSidebar;
        let sideBarWidth = foldSidebar ? 80 : 360;
        let width = window.innerWidth - sideBarWidth - 60;
        let right = width - left5 + 2;
        const task = model.get('prevTask');
        return task.map((item, index) => {
            return (
                <div
                    key={item.get('name')}
                    style={{right: right + 'px', top: index * 34 + 50 + 'px'}}
                    styleName={`task task-${item.get('status')}`}
                >
                    {item.get('name')}
                    <span>
                        {item.get('status') === 'success' ? <Icon type="check-circle" /> : <Icon type="issues-close" />}
                    </span>
                </div>
            );
        });
    },
    renderReportDetails(detail, sum) {
        const {model} = this.props;
        const filter = model.get('filter');
        return (
            <div styleName="report-progress">
                {detail.map(item => {
                    return (
                        <div
                            key={item.title}
                            styleName="report-item"
                            onClick={() => model.sendChangeFilter(item.status)}
                        >
                            <p styleName={filter === item.status ? 'selected' : ''}>
                                {item.title} <span>{item.num}</span>
                            </p>
                            <div styleName="progress">
                                <span
                                    style={{width: sum === 0 ? '0' : (item.num * 100) / sum + '%'}}
                                    styleName={'progress-' + item.status}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    },
    renderSchedule() {
        let left5 = this.getLeftPosition(5) + 2;
        let right9 = this.getLeftPosition(9) - 2;
        let width = right9 - left5;
        let {detail, percent, pieData, sum} = this.getReportSummary();
        return (
            <div styleName="schedule-task" className="row" style={{left: left5 + 'px', width: width + 'px'}}>
                {sum > 0 ? (
                    <RadialChart
                        styleName={'donut-chart-example'}
                        innerRadius={35}
                        radius={49}
                        getAngle={d => d.theta}
                        data={pieData}
                        width={100}
                        height={100}
                        padAngle={0.01}
                        margin={0}
                        colorType="literal"
                    >
                        <Hint value={{x: 0, y: 0}}>
                            <span styleName="hint">{percent}%</span>
                        </Hint>
                    </RadialChart>
                ) : (
                    <div>Not Triggered</div>
                )}
                {this.renderReportDetails(detail, sum)}
            </div>
        );
    },
    renderTable(model) {
        let columns = this.getColumns();
        let data = model.get('reports').toJS();
        let filter = model.get('filter');
        if (filter) {
            data = data.filter(item => {
                return item.status === filter;
            });
        }
        return <Table columns={columns} dataSource={data} rowKey={record => record.reportId} />;
    },
    renderTimezone() {
        const {model} = this.props;
        const timezone = model.get('timezone');
        const timezoneList = model.get('timezoneList');
        return (
            <div styleName="timezone">
                <Radio.Group buttonStyle="solid" onChange={e => model.sendChangeTimeZone(e)}>
                    {timezoneList.map(item => {
                        return (
                            <Radio.Button key={item} value={item} checked={timezone === item} styleName="radio">
                                {item}
                                <span styleName="timezone-time">{moment.tz(item).format('HH:mm')}</span>
                            </Radio.Button>
                        );
                    })}
                </Radio.Group>
            </div>
        );
    },
    render() {
        const {model} = this.props;
        const dateModel = model.get('date');
        return (
            <div style={{overflowX: 'hidden'}}>
                <Title title="Analytics Schedule Report Pipeline status" />
                <div className="row">
                    {this.renderTimezone()}
                    <div>
                        {!dateModel ? null : (
                            <DatePicker
                                value={moment(dateModel, 'YYYY-MM-DD')}
                                format="YYYY-MM-DD"
                                onChange={(date, str) => this.changeDate(date, str)}
                            />
                        )}
                    </div>
                </div>
                <div styleName="dashboard">
                    <div className="row" styleName="timeline">
                        {[...Array(12)].concat('...', '24').map((n, i) => {
                            if (n === '...') {
                                return <div key={i}>{n}</div>;
                            } else if (n === '24') {
                                return <div key={i}>{n + 'h'}</div>;
                            }
                            return (
                                <div key={i} styleName={i === 5 || i === 9 ? 'time-mark' : ''}>
                                    <span>{i + 'h'}</span>
                                    {i === 5 || i === 9 ? <div styleName={'time-' + i}></div> : null}
                                </div>
                            );
                        })}
                    </div>
                    <div styleName="task-status">
                        {this.renderTimeline(model)}
                        {this.renderPreTask(model)}
                        {this.renderSchedule()}
                    </div>
                </div>
                <div styleName="report-table">
                    <Title title="Schedule Report generating detail" />
                    {this.renderTable(model)}
                </div>
            </div>
        );
    },
    getColumns() {
        return [
            {
                title: 'Report ID',
                dataIndex: 'reportId'
            },
            {
                title: 'Report Name',
                dataIndex: 'reportName'
            },
            {
                title: 'Network ID',
                dataIndex: 'networkId'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                render: status => <Tag color={colors[status]}>{status.toUpperCase()}</Tag>
            },
            {
                title: 'Report Name',
                key: 'action',
                render: (text, record) => {
                    return (
                        <span>
                            <Link href={`delivery?id=${record.reportId}`}>check delivery</Link>
                            <Divider type="vertical" />
                            <Link href={`detail?reportID=${record.reportId}&userName=${record.createUser}`}>
                                check detail
                            </Link>
                        </span>
                    );
                }
            }
        ];
    },
    getLeftPosition(hour, minutes = 0) {
        let foldSidebar = this.props.foldSidebar;
        let sideBarWidth = foldSidebar ? 80 : 360;
        let leftPosition;
        let width = window.innerWidth - sideBarWidth - 60;
        let splitWidth = (width - 18 * 12 - 30 * 2) / 13;
        if (hour > 11) {
            leftPosition = splitWidth * 11 + 18 * 11 + 9 + (((hour - 11) * 60 + minutes) / (13 * 60)) * 2 * splitWidth;
        } else {
            leftPosition = splitWidth * hour + 18 * hour + 9 + (minutes / 60) * splitWidth;
        }
        if (hour === 5) {
            leftPosition += 6;
        } else if (hour > 5 && hour < 9) {
            leftPosition += 12;
        } else if (hour === 9) {
            leftPosition += 18;
        } else if (hour > 9) {
            leftPosition += 24;
        }
        return leftPosition;
    },
    getReportSummary() {
        const {model} = this.props;
        const reports = model.get('reports');
        let success = 0;
        let waiting = 0;
        let running = 0;
        let fail = 0;
        reports.forEach(item => {
            if (item.get('status') === 'success') {
                success++;
            } else if (item.get('status') === 'running') {
                running++;
            } else if (item.get('status') === 'waiting') {
                waiting++;
            } else {
                fail++;
            }
        });
        let pieData = [
            {theta: success, color: '#97C06A'},
            {theta: running, color: '#FF9900'},
            {theta: waiting, color: '#9B9B9B'},
            {theta: fail, color: '#f5222d'}
        ];
        let detail = [
            {
                status: 'success',
                num: success,
                title: 'Finished Reports'
            },
            {
                status: 'running',
                num: running,
                title: 'Running Reports'
            },
            {
                status: 'waiting',
                num: waiting,
                title: 'Waiting Reports'
            },
            {
                status: 'fail',
                num: fail,
                title: 'Fail Reports'
            }
        ];
        let sum = success + waiting + running + fail;
        let percent = sum === 0 ? 0 : success / sum;
        return {
            detail,
            percent: (percent * 100).toFixed(1),
            pieData,
            sum
        };
    },
    changeDate(date, str) {
        const {model} = this.props;
        model.sendChangeDate(str);
    }
});
