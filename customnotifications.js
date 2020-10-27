(function runMailScript(current, template, email, email_action, event) {

	var sc_req_item_gr = new GlideRecord("sc_req_item");
	if(sc_req_item_gr.get(event.parm2)){
		var message_body;
		message_body = sc_req_item_gr.cat_item.u_request_received;
		if (message_body) {
			var regex = /\{\{(.*?)\}\}/g; //every instance of {{variable}}
			var found_variables = message_body.match(regex);
			for (var i in found_variables){
				var variable_name = found_variables[i].replace(/\{|\}/g,""); //remove { and }
				if (variable_name.indexOf('.') != -1){
					var dot_walking = variable_name.split('.'); //if the variable name is an attempt to dot walk
					message_body = message_body.replace(found_variables[i],sc_req_item_gr.variables[dot_walking[0]][dot_walking[1]].getDisplayValue()); //replace variable.subvariable with value
				} else message_body = message_body.replace(found_variables[i],sc_req_item_gr.variables[variable_name].getDisplayValue()); //replace variable with value
			}
			template.print(message_body);
		}
		else template.print("No Message Body Found for this Catalog Item");
	} else template.print("No RITM Found");
})(current, template, email, email_action, event);
