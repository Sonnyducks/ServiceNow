//Scheduled Job

setKnowledgeReminder(30);

function setKnowledgeReminder(numDays) {
	var ps = numDays;
	var pn = parseInt(ps);
	var queryTime = new GlideDate();
	queryTime.addDaysUTC(pn);
	//gs.print('Searching for knowledge expiring on ' + queryTime);
	
	if (pn > 0) {
		var gr = new GlideRecord('kb_knowledge');
		gr.addQuery('workflow_state', 'published');
		gr.addQuery('valid_to', '=', queryTime);
		gr.query();
		while(gr.next()) {
			//gs.print('Knowledge document found: ' + gr.number);
			gs.eventQueue("km.reminder.7days", gr, gr.number, gr.author.name);
		}
	}
}
