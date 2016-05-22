//This finds all locations that are supported by a contract
 
var arrayUtil = new ArrayUtil(); 
var locIDs = new Array(''); 
var i = 0; 
var co = new GlideRecord('service_contract'); 
co.addQuery('u_po_number', parent.u_contract_number); 
co.query(); 
while (co.next()) { 
	if (arrayUtil.indexOf(locIDs, co.u_location.sys_id) == -1){ 
		locIDs[i] = co.u_location.sys_id; 
		i++; 
	} 
}
 
gFile.addEncodedQuery('sys_idIN'+locIDs);  //some made up var
