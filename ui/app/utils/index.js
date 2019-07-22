/**
 * @author
 * @description
 */

import Notes from './notes';
import {reduce, isString, isNull, isUndefined} from 'lodash';
import moment from 'moment';
export const DATE_FORMAT_TYPES_DEFAULT = 'MM/DD/YYYY';
export const DATE_FORMAT_TYPES_BRITISH = 'DD/MM/YYYY';
export const DATE_FORMAT_TYPES_GERMAN = 'DD.MM.YYYY';
export const DATE_FORMAT_TYPES_ITALIAN = 'DD/MM/YYYY';
export const DATE_FORMAT_TYPES_STANDARD = 'YYYY-MM-DD';

/**
 *
 * @param datePolicy
 * @returns {string}
 */
export function getDateFormat(datePolicy) {
    if (datePolicy === '0') {
        return DATE_FORMAT_TYPES_STANDARD;
    } else if (datePolicy === '1') {
        return DATE_FORMAT_TYPES_BRITISH;
    } else if (datePolicy === '2') {
        return DATE_FORMAT_TYPES_GERMAN;
    } else if (datePolicy === '3') {
        return DATE_FORMAT_TYPES_ITALIAN;
    } else {
        return DATE_FORMAT_TYPES_DEFAULT;
    }
}
/**
 * Check the char has emoji or not
 * @param char
 * @returns {boolean} true: contains, false: not contains
 */
function isEmoji(char) {
    let reg = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;
    return reg.test(char);
}

/**
 * check the validation of reportName: empty/more than 255 chars/ has special chars like \/:"*?<|>' and emoji are not validate
 * @param {string} reportName
 * @return {object}
 * @return {string} object.type success|error
 * @return {string} object.message
 */
export function checkNameValidation(reportName, _) {
    let name = reportName.trim();
    let checkResult;
    if (!name || name.length < 1) {
        checkResult = {
            type: 'error',
            message: Notes(_).report_name_empty.content
        };
    } else if (name.length > 255) {
        checkResult = {
            type: 'error',
            message: Notes(_).report_name_more_than_255.content
        };
    } else if (name.match(/\\|\/|\:|\*|\?|"|<|>|\|/)) {
        checkResult = {
            type: 'error',
            message: Notes(_).report_name_contains_special_characters.content
        };
    } else if (isEmoji(name)) {
        checkResult = {
            type: 'error',
            message: Notes(_).report_name_contains_emoji.content
        };
    } else {
        checkResult = {
            type: 'success'
        };
    }
    return checkResult;
}

/**
 * serialize the string
 * @param value
 * @returns {*}
 */
function serialize(value) {
    if (isString(value)) {
        return value;
    } else {
        return JSON.stringify(value);
    }
}

/**
 * joint the string with params
 * @param note, string with params
 * @param params
 * @returns {*}
 */
export function interpolateNote(note, params) {
    return reduce(
        params,
        (memo, value, key) => {
            const reg = new RegExp('%{' + key + '}', 'ig');
            return memo.replace(reg, serialize(value));
        },
        note
    );
}

/**
 * convert time to special format
 * @param timeutc
 * @param format
 * @param tz_name
 * @param withzoneAbbr
 * @returns {*}
 */
export function timeConvert(timeutc, format, tz_name, withzoneAbbr) {
    if (timeutc) {
        let timeutcformat;
        if (timeutc === 'now') {
            timeutcformat = moment.tz(moment().format(), 'UTC');
        } else {
            timeutcformat = moment.tz(timeutc, 'UTC');
        }
        const timelocal = timeutcformat.tz(tz_name);
        if (withzoneAbbr === true) {
            return timelocal.format(format) + ' ' + timelocal.zoneAbbr();
        } else {
            return timelocal.format(format);
        }
    } else {
        return '';
    }
}

/**
 *
 * @param datePolicy
 * @param dataParse
 * @returns {*}
 */
export function parseDataParseByPolicy(datePolicy, dataParse) {
    if (!dataParse) {
        return dataParse;
    }
    let fmt = getDateFormat(datePolicy);
    let datetime = [];
    let dataParseStr = dataParse;
    // eslint-disable-next-line func-names
    dataParse.replace(/((\d{4}(-\d{1,2}){2}))/g, function t(nd) {
        datetime.push(nd);
    });
    if (datetime.length === 2) {
        dataParseStr = dataParse.replace(/((\d{4}(-\d{1,2}){2}))/, moment(datetime[0], 'YYYY-MM-DD').format(fmt));
        dataParseStr = dataParseStr.replace(/((\d{4}(-\d{1,2}){2}))/, moment(datetime[1], 'YYYY-MM-DD').format(fmt));
    }
    return dataParseStr;
}

/**
 *
 * @param datePolicy
 * @param cellData
 * @returns {*}
 */
export function parseDateCellByPolicy(datePolicy, cellData) {
    if (cellData === '' || isNull(cellData) || isUndefined(cellData)) return cellData;
    let fmt = getDateFormat(datePolicy);
    let date;
    cellData.replace(/((\d{4}(\/\d{1,2}){2}))/, nd => {
        date = nd;
    });
    return cellData.replace(/((\d{4}(\/\d{1,2}){2}))/, moment(date, 'YYYY/MM/DD').format(fmt));
}

/**
 * @param value
 * @returns {*}
 */
export function FloatToTime(value) {
    const hour = Math.trunc(value);
    const minute = Math.floor((value - Math.trunc(value)) * 60);
    return hour + ':' + padding3(minute, 2);
}

/**
 * @param {*} num
 * @param {*} length
 */
function padding3(num, length) {
    let decimal = num / Math.pow(10, length);
    decimal = decimal.toFixed(length) + '';
    return decimal.substr(decimal.indexOf('.') + 1);
}
