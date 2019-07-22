import {createModel, PropTypes, ImmutablePropTypes, createConstants} from 'spark-modula';
import {List, Map, fromJS} from 'immutable';
import moment from 'moment-timezone';

export const ActionTypes = createConstants('IMPACT', {
    INIT_DATA: null,
    CHANGE_TIMEZONE: null,
    CHANGE_FILTER: null,
    CHANGE_DATE: null,
    CHANGE_NETWORK_ID: null,
    SEARCH: null,
    EXPORT: null
});

const SearchStruct = ImmutablePropTypes.mapContains({
    timezoneName: PropTypes.string,
    networkID: PropTypes.string,
    eventDate: PropTypes.string
});

export default createModel({
    displayName: 'ImpactModel',
    propTypes: {
        reports: PropTypes.list,
        timezone: PropTypes.string,
        date: PropTypes.string,
        searchParams: SearchStruct
    },
    defaults: {
        searchParams: () =>
            new Map({
                timezoneName: 'America/New_York',
                networkID: ''
            }),
        reports: () => new List()
    },
    contextTypes: {
        fetchResource: PropTypes.func.isRequired,
        handleGlobalException: PropTypes.func.isRequired
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
        let date = this.get('date');
        if (!date) {
            date = moment.tz(this.get('timezone')).format('YYYY-MM-DD');
        }
    },

    recvInit() {
        return {
            type: ActionTypes.INIT_DATA,
            update(model, action) {
                let {date} = action.payload;
                return [model.setMulti({date})];
            }
        };
    },

    sendChangeDate(date) {
        this.dispatch({
            type: ActionTypes.CHANGE_DATE,
            payload: {date}
        });
    },

    recvChangeDate() {
        return {
            type: ActionTypes.CHANGE_DATE,
            update(model, {payload}) {
                return [model.set('date', payload.date), model.sendInit];
            }
        };
    },

    sendSearch() {
        const fetchResource = this.getContext('fetchResource');
        const handleGlobalException = this.getContext('handleGlobalException');
        const searchParams = this.get('searchParams');
        let timezoneName = searchParams.get('timezoneName');
        if (timezoneName === undefined) {
            timezoneName = '';
        }

        const networkID = searchParams.get('networkID');
        const eventDate = this.get('date');
        this.bubbleEvent('showLoading');
        let canSearch = this.checkParams();
        if (!canSearch) {
            return;
        }
        return fetchResource('impactSearch', {
            timezoneName,
            networkID,
            eventDate
        })
            .then(response => {
                // let {reports} = response.data;
                this.dispatch({
                    type: ActionTypes.SEARCH,
                    payload: {response}
                });
                this.bubbleEvent('hideLoading');
            })
            .catch(handleGlobalException);
    },
    recvSearch() {
        return {
            type: ActionTypes.SEARCH,
            update(model, action) {
                let {response} = action.payload;
                let {reports} = response.data;
                return [
                    model.setMulti({
                        reports: fromJS(reports)
                    })
                ];
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

    sendChangeTimezone(value) {
        this.dispatch({
            type: ActionTypes.CHANGE_TIMEZONE,
            payload: {
                value
            }
        });
    },
    recvChangeTimezone() {
        return {
            type: ActionTypes.CHANGE_TIMEZONE,
            update(model, action) {
                const {value} = action.payload;
                let search = model.get('searchParams');
                let newSearch = search.set('timezoneName', value);
                let newModel = model.set('searchParams', newSearch);
                return [newModel];
            }
        };
    },
    checkParams() {
        const searchParams = this.get('searchParams');
        const timezone = searchParams.get('timezoneName');
        const networkID = searchParams.get('networkID');
        return !!(timezone || networkID);
    },
    checkResult() {
        let data = this.get('reports').toJS();
        if (data.length === 0) {
            return false;
        } else return true;
    }
});
