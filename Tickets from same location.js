//USE: Relationship script for call; find all task records from callers at the same location
 
var location = parent.caller.location; 
if( JSUtil.notNil(location) ) { 
  var inc = "sys_class_name=incident^active=true^ref_incident.caller_id.location="+location; 
  var prb = "sys_class_name=problem^active=true^opened_by.location="+location; 
  var chg = "sys_class_name=change_request^active=true^ref_change_request.requested_by.location="+location; 
  var scr = "sys_class_name=sc_request^active=true^ref_sc_request.requested_for.location="+location; 
   
  current.addEncodedQuery(inc+"^NQ"+prb+"^NQ"+chg+"^NQ"+scr); 
} 
else 
  current.addEncodedQuery("sys_idISEMPTY");
