//USE:  Have a UI Acton run both a client script and a server-side script.
//EXAMPLE:  Have a pop-up window confirm that the user wants to close a request.

//UI Acton Setup
//UI Action:   Cancel Request 
//Action_name:  cancel_request 
//Client = true 
//Onclick = cancelTicket(); 
 
 
function cancelTicket(){ 
	var answer=confirm("Are you sure you want to cancel this record?"); 
	if (answer==true) { 
		gsftSubmit(null, g_form.getFormElement(), 'cancel_request'); //MUST call the 'Action name' set in this UI Action 
	} else { 
		return false; 
	} 
} 
 
//Code that runs without 'onclick' 
//Ensure call to server-side function with no browser errors 
if (typeof window == 'undefined') 
	serverClose(); 
 
function serverClose(){ 
	current.stage = 'Closed'; 
	current.state = 3; 
	current.update(); 
} 
