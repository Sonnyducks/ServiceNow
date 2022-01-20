var cc_VaccinationAjaxProcessor = Class.create();
cc_VaccinationAjaxProcessor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    secondDoseWaitValidation: function() {
        var dose1 = this.getParameter('sysparm_date_1');
        var dose2 = this.getParameter('sysparm_date_2');
        var vac = this.getParameter('sysparm_vacc_def');

        var dose1Date = new GlideDateTime('1970-01-01 00:00:00');
        dose1Date.add(dose1);

        var dose2Date = new GlideDateTime('1970-01-01 00:00:00');
        dose2Date.add(dose2);

        var vacDef = new GlideRecord('sn_imt_vaccine_vaccine_response_definition');
        vacDef.get('sys_id', vac);

        var waitPeriod = vacDef.getValue('days_between_doses');
        var dueDate = new GlideDateTime(dose1Date);
        dueDate.addDaysLocalTime(waitPeriod);

        var diff = dose2Date.compareTo(dueDate);
		var message = 'ok';
		
		if (diff == -1) {
			message = vacDef.getValue('manufacturer') + ' requires ' + vacDef.getValue('days_between_doses') + ' days between vaccinations.';
		}
		
        return diff;
    },

    type: 'cc_VaccinationAjaxProcessor'
});
