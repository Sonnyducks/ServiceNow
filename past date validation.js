// Go-Live Date can't be a Date in the past
    if (isLoading || newValue === '') {
        return;
    }

    // current date
    var currentDateObj = new Date();
    var currentDateStr = formatDate(currentDateObj, g_user_date_format);
    var currentDateNum = getDateFromFormat(currentDateStr, g_user_date_format);

    // entered date
    var startDateNum = getDateFromFormat(newValue, g_user_date_format);

    if (startDateNum < currentDateNum) {
        g_form.clearValue('target_go_live_date');
		g_form.showFieldMsg("target_go_live_date", "Past date not allowed.");

        return false;
    }
