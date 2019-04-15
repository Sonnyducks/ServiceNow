//location:  time_card table
//use:  use to calculate billable hours and billable percentage of a time sheet.  billable hours and billable percent fields will need to be added to the time_sheet table.
//condition:  when total or "category" (custom field changes).   If using a billable checkbox then adjust script below accordingly.


setBillableFields(current.time_sheet.sys_id);
	
	function setBillableFields(tsID) {
		var sql = 'categoryINtask_work,Customer Contract Reconciliation,Customer Documentation,Customer Meeting,Customer Satisfaction,Customer Travel^time_sheet=' + tsID;
		
		var ts = new GlideRecord('time_sheet');
		ts.get(tsID);
		
		var totalHours = ts.total_hours;
		
		var timeCard = new GlideRecord('time_card');
		timeCard.addEncodedQuery(sql);
		timeCard.query();
		
		var billableHours = 0;
		var billablePercent = 0;
		
		while (timeCard.next()) {
			var n = parseFloat(timeCard.getValue('total'));
			billableHours += n;
		}
		
		billablePercent = (billableHours/totalHours)*100;
		var pString = billablePercent.toFixed(2);
		
		if (pString == '' || billableHours == 0)
			pString = 0;
		
		//DEBUG
		//gs.log('Total Hours: ' + totalHours);
		//gs.log('Billable Hours: ' + billableHours);
		//gs.log('Billable %: ' + pString);
		
		ts.u_billable_hours = billableHours;
		ts.u_billable_percent = pString;
		ts.update();
	}
