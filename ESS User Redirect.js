USE:  UI Script; if a user has no roles force them to the ESS site

addLoadEvent(ESSUserRedirect); 
function ESSUserRedirect() { 
  if(g_user.userName != "guest"){ 
    if(!g_user.hasRoles()){ 
      if(document.URL.indexOf('ess')==-1)  { 
        var url = "https://" + window.location.host + "/ess"; 
        window.location.href = url; 
      } 
    } 
  } 
}
