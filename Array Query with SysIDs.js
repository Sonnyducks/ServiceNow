//This finds all locations that are supported by a contract
 
var arrayUtil = new ArrayUtil(); 
var locIDs = new Array(''); 
var i = 0; 
var co = new GlideRecord('service_commitment'); 
co.addQuery('u_sps_po_number', parent.u_sps_contract_number); 
co.query(); 
while (co.next()) { 
	if (arrayUtil.indexOf(locIDs, co.u_sps_location.sys_id) == -1){ 
		locIDs[i] = co.u_sps_location.sys_id; 
		i++; 
	} 
}
 
current.addEncodedQuery('sys_idIN'+locIDs);
