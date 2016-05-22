//check if there is a schedule, if so use business time left else use actual time left 
var businessHours = false; 
if (!current.sla.schedule.nil()) { 
	var gdt = new GlideDateTime(current.business_time_left); 
	businessHours = true; 
} else { 
	var gdt = new GlideDateTime(current.time_left); 
} 
 
var seconds = gdt.getNumericValue()/1000   //convert milliseconds to seconds 
var timeLeftString = secondsToString(seconds); 
 
function secondsToString(seconds, br) { 
	var numdays = Math.floor((seconds % 31536000) / 86400);  
	var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600); 
	var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60); 
	var returnString = numdays + " days " + numhours + " hours " + numminutes + " minutes"; 
	if (br == true) { 
		returnString += ' (business hours)'; 
	} 
 
	return returnString; 
} 
