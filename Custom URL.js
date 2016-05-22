//USE:  Mail Script to create custom URL, for when  URI_REF won't work...typically need custom text for link.
//Click here to view Incident: ${URI_REF} 
//Click here to view Related Problem: ${problem_id.URI_REF}

var tbl = current.getTableName(); 
var sysID = current.sys_id;   
var link = createLinkForObject(tbl,sysID); 
template.print(link); 
function createLinkForObject(strTableName, strSysID){ 
	return '<a href="' + gs.getProperty('glide.servlet.uri') + gs.generateURL(strTableName, strSysID) + '">LINK TEXT HERE</a>'; 
} 
