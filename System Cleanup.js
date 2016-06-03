//purge table data
purgeTable('task');
purgeTable('new_call');
purgeTable('task_sla');
purgeTable('sys_watermark');
purgeTable('sys_email');
//purgeTable('sys_audit');

//reset counters
resetCounter('task', 20001);
resetCounter('incident', 10001);
resetCounter('new_call', 1001);
resetCounter('problem', 40001);
resetCounter('problem_task', 10001);
resetCounter('change_request', 30001);
resetCounter('change_task', 10001);
resetCounter('sc_request', 10001);
resetCounter('sc_req_item', 10001);
resetCounter('sc_task', 10001);
resetCounter('hr_task', 10001);
resetCounter('hr_case', 10001);

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
