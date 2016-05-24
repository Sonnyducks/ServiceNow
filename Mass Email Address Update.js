//Use: Fix script, to update all email domains in the user table 
//match, relace using regular expression
 
var usr = new GlideRecord('sys_user'); 
usr.addEncodedQuery('emailLIKEbad_domain.com'); 
usr.query(); 
while (usr.next()) { 
  //gs.print('OLD EMAIL: ' + usr.email); 
  var r  = new SNC.Regex('/bad_domain/'); 
  usr.email = r.replaceAll(usr.email, 'new_domain'); 
  usr.update(); 
  //gs.print('NEW EMAIL: ' + usr.email); 
}
