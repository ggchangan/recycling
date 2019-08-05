import {createModel, PropTypes, ImmutablePropTypes, createConstants} from 'spark-modula';
import {List, fromJS} from 'immutable';

const ActionTypes = createConstants('DETAIL', {
    INIT_DATA: null,
    DETAIL: null,
    CHANGE_NETWORK_ID: null,
    CHANGE_CREATE_USER: null,
    CHANGE_REPORT_NAME: null,
    REPORT_DETAIL: null,
    SQL_SHOW: null,
    SELECT_REPORT: null
});

export default createModel({
    displayName: 'DetailModel',
    propTypes: {
        id: PropTypes.string,
        kind: PropTypes.string,
        eKind: PropTypes.string,
        description: PropTypes.string,
        garbages: ImmutablePropTypes.listOf(PropTypes.string)
    },
    contextTypes: {
        fetchResource: PropTypes.func.isRequired,
        handleGlobalException: PropTypes.func.isRequired,
        getUrlQuery: PropTypes.func.isRequired
    },
    defaults: {
        id: 'RECYCLABLE',
        kind: '可回收垃圾',
        eKind: 'RECYCLABLE WASTE',
        description: '指废纸张、废塑料、废玻璃制品、废金属、废织物等适宜回收、可循环利用的生活废弃物',
        garbages: () => new List(['iPad', 'iWatch', 'MP3', 'MP4', '书本', '交通卡'])
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
        const kind = getUrlQuery('kind');
        const kinds = [
            {
                id: 'RECYCLABLE',
                kind: '可回收垃圾',
                eKind: 'RECYCLABLE WASTE',
                description: '指废纸张、废塑料、废玻璃制品、废金属、废织物等适宜回收、可循环利用的生活废弃物'
            },
            {
                id: 'HARMFUL',
                kind: '有害垃圾',
                eKind: 'HARMFUL WASTE',
                description: '指废纸张、废塑料、废玻璃制品、废金属、废织物等适宜回收、可循环利用的生活废弃物'
            },
            {
                id: 'WET',
                kind: '湿垃圾',
                eKind: 'WET WASTE',
                description: '指废纸张、废塑料、废玻璃制品、废金属、废织物等适宜回收、可循环利用的生活废弃物'
            },
            {
                id: 'DRY',
                kind: '干垃圾',
                eKind: 'DRY WASTE',
                description: '指废纸张、废塑料、废玻璃制品、废金属、废织物等适宜回收、可循环利用的生活废弃物'
            }
        ];
        const cKind = kinds.filter(term => term.id === kind.toUpperCase())[0];
        this.dispatch({
            type: ActionTypes.INIT_DATA,
            payload: cKind
        });
    },
    recvInit() {
        return {
            type: ActionTypes.INIT_DATA,
            update(model, action) {
                const {id, kind, eKind, description} = action.payload;
                const newModel = model.setMulti({
                    id,
                    kind,
                    eKind,
                    description
                });
                return [newModel, model.sendDetail];
            }
        };
    },
    sendDetail() {
        const fetchResource = this.getContext('fetchResource');
        const handleGlobalException = this.getContext('handleGlobalException');
        const kind = this.get('id');
        // this.bubbleEvent('showLoading');
        return fetchResource('kindGarbage', {
            kind
        })
            .then(response => {
                let {garbages} = response.data;
                this.dispatch({
                    type: ActionTypes.DETAIL,
                    payload: {garbages}
                });
            })
            .catch(handleGlobalException);
    },
    recvDetail() {
        return {
            type: ActionTypes.DETAIL,
            update(model, action) {
                const {garbages} = action.payload;
                const newModel = model.setMulti({
                    garbages: fromJS(garbages)
                });
                return [newModel];
            }
        };
    }
});
