import {createModel, PropTypes, ImmutablePropTypes, createConstants} from 'spark-modula';
import {List, Map, fromJS} from 'immutable';

const ActionTypes = createConstants('DETAIL', {
    SEARCH: null,
    CHANGE_NETWORK_ID: null,
    CHANGE_CREATE_USER: null,
    CHANGE_REPORT_NAME: null,
    REPORT_DETAIL: null,
    SQL_SHOW: null,
    SELECT_REPORT: null
});

const SearchStruct = ImmutablePropTypes.mapContains({
    networkID: PropTypes.string,
    createUser: PropTypes.string,
    reportName: PropTypes.string
});

const FoundReportStruct = ImmutablePropTypes.mapContains({
    reportID: PropTypes.string,
    networkID: PropTypes.string,
    createUser: PropTypes.string,
    reportName: PropTypes.string,
    updatedAt: PropTypes.string,
    isSelected: PropTypes.bool
});

const ReportDetailStruct = ImmutablePropTypes.mapContains({
    report: FoundReportStruct,
    dimension: ImmutablePropTypes.listOf(PropTypes.string),
    metric: ImmutablePropTypes.listOf(PropTypes.string),
    filter: PropTypes.string,
    dateRange: PropTypes.string,
    sql: PropTypes.string
});

export default createModel({
    displayName: 'DetailModel',
    propTypes: {
        reportID: PropTypes.number,
        createUser: PropTypes.string,
        searchParams: SearchStruct,
        foundReports: ImmutablePropTypes.listOf(FoundReportStruct),
        reportDetail: ReportDetailStruct,
        sqlShow: PropTypes.bool
    },
    contextTypes: {
        fetchResource: PropTypes.func.isRequired,
        handleGlobalException: PropTypes.func.isRequired,
        getUrlQuery: PropTypes.func.isRequired
    },
    defaults: {
        reportID: -1,
        createUser: '',
        searchParams: () => new Map({networkID: '', createUser: '', reportName: ''}),
        foundReports: () => new List([]),
        reportDetail: () => new Map({}),
        sqlShow: true
    },
    modelDidMount() {
        this.sendInit();
    },
    eventTypes: [
        {
            type: 'hideLoading',
            payload: {}
        },
        {
            type: 'showLoading',
            payload: {}
        }
    ],
    sendInit() {
        this.bubbleEvent('hideLoading');
        const getUrlQuery = this.getContext('getUrlQuery');
        let qReportID = getUrlQuery('reportID');
        if (qReportID !== undefined && qReportID !== '' && qReportID !== this.reportID) {
            let createUser = getUrlQuery('userName');
            const fromUrl = true;
            this.sendReportDetail(qReportID, createUser, fromUrl);
        }
    },
    sendSearch() {
        const fetchResource = this.getContext('fetchResource');
        const handleGlobalException = this.getContext('handleGlobalException');
        const searchParams = this.get('searchParams');
        const networkID = searchParams.get('networkID');
        const createUser = searchParams.get('createUser');
        const reportName = searchParams.get('reportName');
        this.bubbleEvent('showLoading');
        return fetchResource('detailSearch', {
            networkID,
            createUser,
            reportName
        })
            .then(response => {
                let {reports} = response.data;
                this.dispatch({
                    type: ActionTypes.SEARCH,
                    payload: {reports}
                });
                // this.bubbleEvent('hideLoading');
            })
            .catch(handleGlobalException);
    },
    recvSearch() {
        return {
            type: ActionTypes.SEARCH,
            update(model, action) {
                const {reports} = action.payload;
                if (reports === undefined || reports.length === 0) {
                    const newModel = model.setMulti({
                        reportID: '',
                        createUser: '',
                        foundReports: new List([]),
                        reportDetail: new Map({}),
                        sqlShow: false
                    });
                    return [newModel];
                }
                const reportID = reports[0].reportID;
                const createUser = reports[0].createUser;
                const newModel = model.setMulti({
                    reportID: reportID,
                    createUser: createUser,
                    foundReports: fromJS(reports)
                });
                return [newModel, () => model.sendReportDetail(reportID, createUser)];
            }
        };
    },
    sendReportDetail(reportID, createUser, fromUrl) {
        const fetchResource = this.getContext('fetchResource');
        const handleGlobalException = this.getContext('handleGlobalException');
        // this.bubbleEvent('showLoading');
        return fetchResource('detailReport', {
            reportID,
            createUser
        })
            .then(response => {
                let {dimension, metric, filter, date_range: dateRange, sql, foundReport} = response.data;
                this.dispatch({
                    type: ActionTypes.REPORT_DETAIL,
                    payload: {dimension, metric, filter, dateRange, sql, foundReport, fromUrl}
                });
                this.bubbleEvent('hideLoading');
            })
            .catch(handleGlobalException);
    },
    recvReportDetail() {
        const getUrlQuery = this.getContext('getUrlQuery');
        const qReportID = getUrlQuery('reportID');
        const createUser = getUrlQuery('userName');
        return {
            type: ActionTypes.REPORT_DETAIL,
            update(model, action) {
                const {dimension, metric, filter, dateRange, sql, foundReport, fromUrl} = action.payload;
                const detail = model.get('reportDetail');
                let newDetail = detail.merge({
                    dimension: new List(dimension),
                    metric: new List(metric),
                    filter: filter,
                    dateRange: dateRange,
                    sql: sql
                });
                let newModel = model.set('reportDetail', newDetail);
                if (fromUrl) {
                    // come from url to refresh table
                    newModel = newModel.setMulti({
                        reportID: qReportID,
                        createUser: createUser,
                        foundReports: new List([foundReport])
                    });
                }

                return [newModel];
            }
        };
    },
    sendChangeNetworkID(e, fieldName) {
        const value = e.target.value;
        this.dispatch({
            type: ActionTypes.CHANGE_NETWORK_ID,
            payload: {
                value,
                fieldName
            }
        });
    },
    recvChangeNetWorkID() {
        return {
            type: ActionTypes.CHANGE_NETWORK_ID,
            update(model, action) {
                const {value, fieldName} = action.payload;
                let search = model.get('searchParams');
                let newSearch = search.set(fieldName, value);
                let newModel = model.set('searchParams', newSearch);
                return [newModel];
            }
        };
    },
    sendChangeCreateUser(e, fieldName) {
        const value = e.target.value;
        this.dispatch({
            type: ActionTypes.CHANGE_CREATE_USER,
            payload: {
                value,
                fieldName
            }
        });
    },
    recvChangeCreateUser() {
        return {
            type: ActionTypes.CHANGE_CREATE_USER,
            update(model, action) {
                const {value, fieldName} = action.payload;
                let search = model.get('searchParams');
                let newSearch = search.set(fieldName, value);
                let newModel = model.set('searchParams', newSearch);
                return [newModel];
            }
        };
    },
    sendChangeReportName(e, fieldName) {
        const value = e.target.value;
        this.dispatch({
            type: ActionTypes.CHANGE_REPORT_NAME,
            payload: {
                value,
                fieldName
            }
        });
    },
    recvChangeReportName() {
        return {
            type: ActionTypes.CHANGE_REPORT_NAME,
            update(model, action) {
                const {value, fieldName} = action.payload;
                let search = model.get('searchParams');
                let newSearch = search.set(fieldName, value);
                let newModel = model.set('searchParams', newSearch);
                return [newModel];
            }
        };
    },
    sendSqlShow() {
        this.dispatch({
            type: ActionTypes.SQL_SHOW,
            payload: {}
        });
    },
    recvSqlShow() {
        return {
            type: ActionTypes.SQL_SHOW,
            update(model) {
                let sqlShow = !model.get('sqlShow');
                let newModel = model.set('sqlShow', sqlShow);
                return [newModel];
            }
        };
    },
    sendSelectRow(reportID, createUser) {
        this.dispatch({
            type: ActionTypes.SELECT_REPORT,
            payload: {reportID, createUser}
        });
    },
    recvSelectRow() {
        return {
            type: ActionTypes.SELECT_REPORT,
            update(model, action) {
                const {reportID, createUser} = action.payload;
                const newModel = model.setMulti({
                    reportID: reportID,
                    createUser: createUser
                });
                return [newModel, () => model.sendReportDetail(reportID, createUser, false)];
            }
        };
    }
});
