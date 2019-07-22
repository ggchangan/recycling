import {createModel, PropTypes, ImmutablePropTypes, createConstants} from 'spark-modula';
import {List, fromJS} from 'immutable';
import moment from 'moment-timezone';

export const ActionTypes = createConstants('DASHBOARD', {
    INIT_DATA: null,
    CHANGE_TIMEZONE: null,
    CHANGE_FILTER: null,
    CHANGE_DATE: null
});

export default createModel({
    displayName: 'DashboardModel',
    propTypes: {
        reports: PropTypes.list,
        timezone: PropTypes.string,
        timezoneList: ImmutablePropTypes.list,
        prevTask: ImmutablePropTypes.list,
        filter: PropTypes.string,
        date: PropTypes.string
    },
    defaults: {
        reports: () => new List(),
        timezone: 'America/New_York',
        prevTask: () => new List(),
        filter: '',
        date: '',
        timezoneList: () =>
            new List([
                'America/New_York',
                'ETC/GMT',
                'Europe/London',
                'EET',
                'CET',
                'Australia/Melbourne',
                'America/Los_Angeles'
            ])
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
        const fetchResource = this.getContext('fetchResource');
        const handleGlobalException = this.getContext('handleGlobalException');
        const timezone = this.get('timezone');
        let date = this.get('date');
        this.bubbleEvent('showLoading');
        if (!date) {
            date = moment.tz(this.get('timezone')).format('YYYY-MM-DD');
        }
        return fetchResource('dashboard', {
            timezone,
            date
        })
            .then(response => {
                let {prevTasks, reports} = response.data;
                this.dispatch({
                    type: ActionTypes.INIT_DATA,
                    payload: {prevTask: prevTasks, reports, timezone, date}
                });
                this.bubbleEvent('hideLoading');
            })
            .catch(handleGlobalException);
    },
    recvInit() {
        return {
            type: ActionTypes.INIT_DATA,
            update(model, action) {
                let {prevTask, reports, date} = action.payload;
                return [
                    model.setMulti({
                        prevTask: prevTask ? fromJS(prevTask) : new List([]),
                        reports: fromJS(reports),
                        date
                    })
                ];
            }
        };
    },
    sendChangeTimeZone(e) {
        let value = e.target.value;
        this.dispatch({
            type: ActionTypes.CHANGE_TIMEZONE,
            payload: {value}
        });
    },
    recvChangeTimeZone() {
        return {
            type: ActionTypes.CHANGE_TIMEZONE,
            update(model, {payload}) {
                return [model.set('timezone', payload.value), model.sendInit];
            }
        };
    },
    sendChangeFilter(type) {
        this.dispatch({
            type: ActionTypes.CHANGE_FILTER,
            payload: {type}
        });
    },
    recvChangeFilter() {
        return {
            type: ActionTypes.CHANGE_FILTER,
            update(model, action) {
                const {type} = action.payload;
                const currentType = model.get('filter');
                let filter = type === currentType ? '' : type;
                return [model.set('filter', filter)];
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
    }
});
