//In this example a custom field is added to the group tabled called tower (reference field to a custom table).  
//The script includes gets all groups the current user is a member of and gets the associated tower for each group.
//A comma seperated list is returned to the calling function.

//USE: Refence Qual: 
javascript:'u_towerIN' + new TowerUtils().getMyTowers() 
 
 
//Script Include: 
var TowerUtils = Class.create(); 
	TowerUtils.prototype = { 
	initialize: function() { 
}, 
 
//returns a comma seperated list of sysIDs based on the users assignment group membership 
getMyTowers:function() { 
	var user = gs.getUserID(); 
	var membership = new GlideRecord('sys_user_grmember'); 
	var queryString = ''; 
	membership.addQuery('user', user); 
	membership.query(); 
	while (membership.next()) { 
		if (queryString.length > 0) { 
			//build a comma separated string of towers if there is more than one 
			queryString += (',' + membership.group.u_tower.sys_id); 
		} else { 
			queryString += membership.group.u_tower.sys_id; 
		} 
	} 
	return queryString; 
}, 
type: 'TowerUtils' 
}; 
