function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    var secondDateEpochMs = getDateFromFormat(newValue, g_user_date_format);
    if (secondDateEpochMs > new Date().getTime()) {
        g_form.clearValue('second_date_administered');
        g_form.showFieldMsg('second_date_administered', getMessage("Date cannot be in the future"), 'error');
        return;
    }

    var firstDate = g_form.getValue('first_date_administered');
    if (firstDate && newValue) {
        var firstDateEpochMs = getDateFromFormat(firstDate, g_user_date_format);
        if (firstDateEpochMs >= secondDateEpochMs) {
            g_form.clearValue('second_date_administered');
            g_form.showFieldMsg('second_date_administered', getMessage("Second dose must be after first dose"), 'error');
            return;
        }
    }

    var ajaxProcessor = new GlideAjax('sn_imt_vaccine.VaccinationAjaxProcessor');
    ajaxProcessor.addParam('sysparm_name', 'secondDoseDateValidation');
    ajaxProcessor.addParam('sysparm_date_administered', secondDateEpochMs);
    ajaxProcessor.getXML(function(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer");
        if (answer === 'false') {
            g_form.clearValue('second_date_administered');
            g_form.showFieldMsg('second_date_administered', getMessage("Date administered cannot be on or before existing response."), 'error');
        } else {
            var ajaxProcessor2 = new GlideAjax('sn_imt_vaccine.cc_VaccinationAjaxProcessor');
            ajaxProcessor2.addParam('sysparm_name', 'secondDoseWaitValidation');
            ajaxProcessor2.addParam('sysparm_date_1', firstDateEpochMs);
            ajaxProcessor2.addParam('sysparm_date_2', secondDateEpochMs);
            ajaxProcessor2.addParam('sysparm_vacc_def', g_form.getValue('vaccine_response_definition'));
            ajaxProcessor2.getXML(function(response) {
                var answer = response.responseXML.documentElement.getAttribute("answer");

                if (answer == -1) {
                    g_form.clearValue('second_date_administered');
                    g_form.showFieldMsg('second_date_administered', "Date of second dose does not meet vaccination wait period.", 'error');

                }
            });
        }
    });
}
