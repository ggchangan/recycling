import {createModel, createConstants, ImmutablePropTypes, PropTypes} from 'spark-modula';
import {List, fromJS} from 'immutable';

const ActionTypes = createConstants('Delivery_INFO', {
    SEARCH_COND_CHANGED: null,
    SEARCH: null,
    ACHIEVE_DELIVERY: null,
    SELECT_REPORT: null
});

const FoundReportStruct = ImmutablePropTypes.mapContains({
    reportID: PropTypes.string,
    networkID: PropTypes.string,
    createUser: PropTypes.string,
    reportName: PropTypes.string,
    recurrenceRange: PropTypes.string,
    recurrenceType: PropTypes.string,
    DeliveryMethods: PropTypes.string,
    emailList: ImmutablePropTypes.listOf(PropTypes.string)
});

const DeliveryTimeStruct = ImmutablePropTypes.mapContains({
    x: PropTypes.string,
    deliveryTime: PropTypes.string,
    y: PropTypes.number
});

const EmailDeliveryTimeStruct = ImmutablePropTypes.mapContains({
    index: PropTypes.number,
    date: PropTypes.string,
    receiver: PropTypes.string,
    sentTime: PropTypes.string
});

export default createModel({
    displayName: 'DeliveryModel',
    propTypes: {
        reportID: PropTypes.number,
        networkID: PropTypes.number,
        creator: PropTypes.string,
        reportName: PropTypes.string,
        foundReports: ImmutablePropTypes.listOf(PropTypes.instanceOf(FoundReportStruct)),
        finishTime: ImmutablePropTypes.listOf(PropTypes.instanceOf(DeliveryTimeStruct)),
        email: ImmutablePropTypes.listOf(PropTypes.instanceOf(EmailDeliveryTimeStruct))
    },

    defaults: {
        reportID: -1,
        networkID: null,
        creator: '',
        reportName: '',
        foundReports: () => new List([]),
        finishTime: () => new List([]),
        email: () => new List([])
    },

    contextTypes: {
        fetchResource: PropTypes.func.isRequired,
        handleGlobalException: PropTypes.func.isRequired,
        getUrlQuery: PropTypes.func.isRequired
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

    modelDidMount() {
        this.sendInit();
    },

    sendInit() {
        this.bubbleEvent('hideLoading');
    },

    sendInputChange(inputType, inputValue) {
        this.dispatch({
            type: ActionTypes.SEARCH_COND_CHANGED,
            payload: {inputType, inputValue}
        });
    },

    recvInputChange() {
        return {
            type: ActionTypes.SEARCH_COND_CHANGED,
            update(model, action) {
                const {inputType, inputValue} = action.payload;
                return [model.set(inputType, inputValue)];
            }
        };
    },

    sendSearch() {
        const handleGlobalException = this.getContext('handleGlobalException');
        const fetchResource = this.getContext('fetchResource');
        const reportID = this.get('reportID');
        const networkID = this.get('networkID');
        const creator = this.get('creator');
        const reportName = this.get('reportName');
        this.bubbleEvent('showLoading');
        if (!this.checkParams()) {
            return;
        }
        return fetchResource('scheduledReports', {
            reportID,
            networkID,
            creator,
            reportName
        })
            .then(response => {
                let {reportList, count} = response.data;
                this.dispatch({
                    type: ActionTypes.SEARCH,
                    payload: {reportList, count}
                });
                this.bubbleEvent('hideLoading');
            })
            .catch(handleGlobalException);
    },

    recvSearch() {
        return {
            type: ActionTypes.SEARCH,
            update(model, action) {
                const {reportList, count} = action.payload;

                let reportID = -1;
                if (count !== 0) {
                    reportID = reportList[0].reportID;
                }
                const newModel = model.setMulti({
                    reportID: reportID,
                    foundReports: fromJS(reportList)
                });
                return [newModel, model.sendDeliveryDetails];
            }
        };
    },

    sendSelectRow(reportID) {
        this.dispatch({
            type: ActionTypes.SELECT_REPORT,
            payload: {reportID}
        });
    },

    recvSelectRow() {
        return {
            type: ActionTypes.SELECT_REPORT,
            update(model, action) {
                const {reportID} = action.payload;
                const newModel = model.setMulti({
                    reportID: reportID
                });
                return [newModel, model.sendDeliveryDetails];
            }
        };
    },

    sendDeliveryDetails() {
        const handleGlobalException = this.getContext('handleGlobalException');
        const fetchResource = this.getContext('fetchResource');
        const reportID = this.get('reportID');
        this.bubbleEvent('showLoading');
        return fetchResource('deliveryDetails', {reportID})
            .then(response => {
                let {finishTime, email} = response.data.deliveryDetails;
                this.dispatch({
                    type: ActionTypes.ACHIEVE_DELIVERY,
                    payload: {finishTime, email}
                });
                this.bubbleEvent('hideLoading');
            })
            .catch(handleGlobalException);
    },

    recvDeliveryDetails() {
        return {
            type: ActionTypes.ACHIEVE_DELIVERY,
            update(model, action) {
                const {finishTime, email} = action.payload;
                const newModel = model.setMulti({
                    finishTime: fromJS(finishTime),
                    email: fromJS(email)
                });
                return [newModel];
            }
        };
    },
    checkParams() {
        const networkID = this.get('networkID');
        const creator = this.get('creator');
        const reportName = this.get('reportName');
        return !!(networkID || creator || reportName);
    }
});
