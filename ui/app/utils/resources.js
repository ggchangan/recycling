const extraResourcesAPI = {
    initInfo: {
        type: 'json',
        method: 'GET',
        url: '/analytics/api/initInfo'
    },
    dashboard: {
        type: 'json',
        method: 'GET',
        url: '/doraemon/api/dashboard?timezone=%{timezone}&date=%{date}'
    },
    scheduledReports: {
        type: 'json',
        method: 'GET',
        url:
            '/doraemon/api/schedule_report?reportID=%{reportID}&networkID=%{networkID}&creator=%{creator}&reportName=%{reportName}'
    },
    deliveryDetails: {
        type: 'json',
        method: 'GET',
        url: '/doraemon/api/delivery_details?reportID=%{reportID}'
    },
    impact: {
        type: 'json',
        method: 'GET',
        url: '/doraemon/api/impact?date=%{date}'
    },
    kindGarbage: {
        type: 'json',
        method: 'GET',
        url: '/doraemon/api/detail?kind=%{kind}'
    },
    detailReport: {
        type: 'json',
        method: 'GET',
        url: '/doraemon/api/detail?reportID=%{reportID}&userName=%{createUser}'
    },
    impactSearch: {
        type: 'json',
        method: 'GET',
        url: '/doraemon/api/impact/search?timezone=%{timezoneName}&networkID=%{networkID}&eventDate=%{eventDate}'
    },
    impactExport: {
        type: 'json',
        method: 'GET',
        url: '/doraemon/api/impact/export?timezone=%{timezoneName}&networkID=%{networkID}&eventDate=%{eventDate}'
    }
};

export default extraResourcesAPI;
