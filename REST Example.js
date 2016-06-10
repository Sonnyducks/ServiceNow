var refNumber = 'INC0000001';
var request = new sn_ws.RESTMessageV2();
request.setEndpoint('https://YOUR_INSTANCE.service-now.com/api/now/table/incident?sysparm_query=&sysparm_limit=1&number=' + refNumber);
request.setHttpMethod('GET');

//Eg. UserName="admin", Password="admin" for this code sample.  *NEEDS UPDATING
var user = 'admin';
var password = 'admin';

request.setBasicAuth(user,password);
request.setRequestHeader("Accept","application/json");
 
var response = request.execute();
gs.log(response.getBody());
