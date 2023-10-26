//client script
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }

    var supervisorFields = ['supervisor_business_phone', 'supervisor_email'];

    for (var i = 0; i < supervisorFields.length; i++) {
        g_form.clearValue(supervisorFields[i]);
        g_form.hideFieldMsg(supervisorFields[i]);
    }

    var ga = new GlideAjax('OffboardingRecordProducerAjax');
    ga.addParam('sysparm_name', 'getSupervisorInformation');
    ga.addParam('sysparm_supervisor', g_form.getValue('u_offboarding_supervisor'));
    ga.getXMLAnswer(updateSupervisorFields);
}

function updateSupervisorFields(answer) {
    if (answer) {
        var supervisorInfo = JSON.parse(answer);   //returning JSON, must parse.

        (supervisorInfo.email ?
            g_form.setValue('supervisor_email', supervisorInfo.email) :
            g_form.showFieldMsg('supervisor_email', 'There is no Email associated to the Employee selected.', 'info')
        );

        (supervisorInfo.phone ?
            g_form.setValue('supervisor_business_phone', supervisorInfo.phone) :
            g_form.showFieldMsg('supervisor_business_phone', 'There is no Business Phone associated to the Supervisor selected.', 'info')
        );
    }
}

//script include
var OffboardingRecordProducerAjax = Class.create();
OffboardingRecordProducerAjax.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
		
	getSupervisorInformation: function() {
		var supervisorSysID = this.getParameter('sysparm_supervisor');
		var gr_user = new GlideRecord('sys_user');
		
        if (gr_user.get(supervisorSysID)) {
			var results = {
				"email": gr_user.getValue('email'),
				"phone": gr_user.getValue('phone'),
			};
			return JSON.stringify(results);
        }
	},
  type: 'OffboardingRecordProducerAjax'
});
