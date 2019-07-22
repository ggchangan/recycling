import {assign} from 'lodash';

export const stableMsg = {
    saved_reports_information: {
        type: 'info',
        content:
            'FreeWheel saves the last seven days of scheduled reports. To access these reports, open the Report Template folder.'
    }
};

const reportList = _ => {
    return {
        share_report_successful: {
            type: 'success',
            content: _('"%{reportName}" has been shared.')
        },
        schedule_report_successful: {
            type: 'success',
            content: _('"%{reportName}" has been scheduled.')
        },
        delete_multiple_msgs_failed: {
            type: 'error',
            content: _('has selected report but not select all messages.')
        },
        delete_multiple_reports_successful: {
            type: 'success',
            content: _('"%{reportName}" and "%{LastReportName}" have been deleted.')
        },
        delete_report_successful: {
            type: 'success',
            content: _('"%{reportName}" has been deleted.')
        },
        delete_msg_successful: {
            type: 'success',
            content: _('Your report(s) has been deleted.')
        },
        copy_report_successful: {
            type: 'success',
            content: _('"%{reportName}" has been copied.')
        },
        run_report: {
            type: 'success',
            content: _('Your report "%{reportName}" is running.')
        },
        rename_report_successful: {
            type: 'success',
            content: _('"%{originalName}" has been renamed to "%{reportName}".')
        },
        invalid_email_address: {
            type: 'error',
            content: _('The email address entered is invalid.')
        }
    };
};

const reportBuilder = _ => {
    return {
        missing_attributes: {
            type: 'error',
            content: _('%{errorMsgPrefix} must be chosen to run or save a report.')
        },
        filter_check_failed: {
            type: 'error',
            content: _(
                'You cannot use equal and not equal with the same filtered item. Please choose one and resubmit your query.'
            )
        },
        query_submit_successful: {
            type: 'success',
            content: _('Your query has been submitted.')
        },
        query_submit_failed: {
            type: 'error',
            content: _(
                'Your report query has failed. FreeWheel Operations has been notified. Please try again in a few minutes.'
            )
        },
        query_report_cancelled: {
            type: 'success',
            content: _('Your query has been cancelled.')
        },
        filter_info: {
            type: 'info',
            content: _(
                'To add a filter to this report, click FILTER next to the dimension or metric you would like to filter by.'
            )
        },
        filter_info_line2: {
            type: 'info',
            content: _(
                'To filter for a specific value of a dimension, use the "Is Equal To" condition to search and select your value.'
            )
        },
        report_table_info1: {
            type: 'info',
            content: _('Select the dimensions and metrics along with the date range you’d like to see.')
        },
        report_table_info2: {
            type: 'info',
            content: _('After the report is run, the data will show here.')
        },
        report_running: {
            type: 'info',
            content: _('Your report is running.')
        },
        report_waiting: {
            type: 'info',
            content: _('Please wait or ')
        },
        report_cancel: {
            type: 'info',
            content: _('cancel the report')
        },
        report_no_result1: {
            type: 'info',
            content: _('No results returned.')
        },
        report_no_result2: {
            type: 'info',
            content: _('Please modify your query or filters and try your request again.')
        },
        report_table_init_info1: {
            type: 'info',
            content: _('Select the dimensions and metrics along with the date range you’d like to see.')
        },
        report_table_init_info2: {
            type: 'info',
            content: _('After the report is run, the data will be shown here.')
        },
        report_table_inactive_info1: {
            type: 'info',
            content: _('There was an error in running your report.')
        },
        report_table_inactive_info2: {
            type: 'info',
            content: _('Please contact FreeWheel Support if the problem persists.')
        },
        rerport_table_row_number_info: {
            type: 'info',
            content: _(
                'FreeWheel only shows the first 100 rows of data.\n You can export the full dataset by clicking Export at the top of the page or see the full dataset by clicking '
            )
        },
        date_range_to_date_clean_up_warning: {
            type: 'warning',
            content: _(
                '%{dimensionName} to Date is only available when at least one %{dimensionName} dimension is selected. Removing all the dimensions under %{dimensionName} will clear the date range.'
            )
        },
        field_num_limit_warning: {
            type: 'warning',
            content: _(
                'Your report will exceed %{max} columns limitation with this operation. Please reduce columns and try again.'
            )
        },
        report_converting: {
            type: 'info',
            content: _('Your excel is generating.')
        }
    };
};

const dateRange = _ => {
    return {
        end_date_before_start_date: {
            type: 'error',
            content: _('The end date cannot be before the start date.')
        },
        date_range_not_setting: {
            type: 'error',
            content: _('Please set a date range for your report by clicking on DATE RANGE.')
        }
    };
};

const reportName = _ => {
    return {
        report_name_empty: {
            type: 'error',
            content: _('Please name your report.')
        },
        report_name_more_than_255: {
            type: 'error',
            content: _('Report names must be less than 255 characters.')
        },
        report_name_contains_special_characters: {
            type: 'error',
            content: _('Report names can not contain the following characters: \\/:*?"<>| ')
        },
        report_name_contains_emoji: {
            type: 'error',
            content: _('Report names can not contain any Emoji characters.')
        },
        save_report_successful: {
            type: 'success',
            content: _('Your report has been saved.')
        }
    };
};

const simplePage = _ => {
    return {
        unsubscribe_default: {
            type: 'info',
            content: _('Please click the button below to unsubscribe from the report.')
        },
        unsubscribe_success: {
            type: 'success',
            content: _('You have been successfully unsubscribed from the report.')
        },
        unsubscribe_fail: {
            type: 'error',
            content: _('Unsubscribed unsuccessfully, please ensure the parameters in the request link are complete.')
        },
        report_expired: {
            type: 'error',
            content: _(`The report you are looking for is no longer available because it has been deleted or expired (available for 7 days).
        Please log into FreeWheel to generate a new report to retrieve the data you were looking for.`)
        },
        export_error: {
            type: 'error',
            content: _(`There has been an error while creating your export. Please resubmit your export request.`)
        }
    };
};

const Notes = _ => {
    let mergedNotes = assign({}, reportList(_), reportBuilder(_));
    mergedNotes = assign({}, dateRange(_), mergedNotes);
    mergedNotes = assign({}, reportName(_), mergedNotes);
    mergedNotes = assign({}, simplePage(_), mergedNotes);
    return mergedNotes;
};

export default Notes;
