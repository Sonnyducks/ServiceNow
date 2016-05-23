//USE:  Client script, fill urgency from a custom field on the CI whenever the CI changes.

function onChange(control, oldValue, newValue, isLoading, isTemplate) { 
  if (isLoading || newValue == '') { 
    return; 
  } 
 
  //Type appropriate comment here, and begin script below 
  var ci = g_form.getReference('cmdb_ci', setUrgency); 
 
} 
 
function setUrgency(ci) { 
  if (ci.u_bus_criticality != '') { 
    g_form.setValue('u_change_urgency', ci.u_bus_criticality); 
  } 
}
