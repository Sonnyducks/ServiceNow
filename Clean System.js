//purge table data
purgeTable('task_sla');
purgeTable('sysapproval_approver');
purgeTable('sys_email');

//purge ticket data
purgeTable('incident_task');
purgeTable('incident');
purgeTable('problem_task');
purgeTable('problem');
purgeTable('change_task');
purgeTable('change_request');
purgeTable('sc_task');
purgeTable('sc_req_item');
purgeTable('sc_request');

//reset counters
resetCounter('incident', 1);
resetCounter('incident_task', 1);
resetCounter('problem', 1);
resetCounter('problem_task', 1);
resetCounter('change_request', 1);
resetCounter('change_task', 1);
resetCounter('sc_request', 1);
resetCounter('sc_req_item', 1);
resetCounter('sc_task', 1);


function purgeTable(table) {
	var gr = new GlideRecord(table);
	gr.query();
	gr.deleteMultiple();
}

function resetCounter(table, num) {
	var counter = new GlideRecord('sys_number_counter');
	counter.addQuery('table', table);
	counter.query();
	while (counter.next()) {
		counter.number = num;
		counter.update();
	}
}
