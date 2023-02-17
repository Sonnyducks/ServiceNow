

(function executeRule(current, previous /*null when async*/ ) {

    // If RPA has a flow desinger execution associated with it, cancel it.
    var flowContext = new GlideRecord('sys_flow_context');
    flowContext.addQuery('state', 'WAITING');
    flowContext.addQuery('source_record', current.sys_id);
    flowContext.addQuery('name', 'STARTSWITH', 'RPA Approvals');
    flowContext.query();

    if (flowContext.next()) {
        var rpaContextID = flowContext.getValue('sys_id');
        sn_fd.FlowAPI.cancel(rpaContextID, "Reset manually by " + gs.getUserName());
    }

    // Cancel exiting approrvals
    var approval = new GlideRecord('sysapproval_approver');
    approval.addQuery('document_id', current.sys_id);
	approval.query();
    while (approval.next()) {
		approval.setValue('state', 'cancelled');
		approval.setValue('comments', 'RPA approvals reset by ' + gs.getUserName());
		approval.update();
	}


    // Reset case so approval flow will kick off again.
    current.u_reset_approvals = false;
    current.approval = 'not requested';
    current.state = 1;


})(current, previous);
