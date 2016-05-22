//PURPOSE: 
//A comma separated list was imported.  After the record is imported, this script would pull apart a comma separated list and add them to a custom table that was a related list of the record being imported. 
 
//When:  onAfter Import Script
//Scenario:  You have a Contract record that has a comma seperated list of products sold.  Both custom tables.
 
//Add related Product Sold 
log.info('DEBUG Processing Covered Products Sold for Contract'); 
 
//Split comma delimited list into an array 
log.info('DEBUG splitting ' + target.u_assoc_products_sold); 
ps = target.u_assoc_products_sold.split(','); 
 
//Cycle thru the products sold and create a a 'covered' record for each one 
for (var i=0; i < ps.length; i++) { 
 //Get the current Product Sold 
 //log.info('DEBUG Line ' + source.u_forign_id + ':  processing for Product Sold ' + ps[i]); 
 var grProductSold = new GlideRecord('u_products_sold'); 
 grProductSold.addQuery("u_foreign_key", ps[i]); 
 grProductSold.query(); 
 
 //If found, create a 'covered' record 
 if (grProductSold.next()) { 
  log.info('DEBUG creating new "Covered Product Sold" for ' + grProductSold.u_part_number); 
  var coveredPS = new GlideRecord('u_covered_products_sold'); 
  coveredPS.initialize(); 
  coveredPS.u_commitment = target.sys_id; 
  coveredPS.u_product_sold = grProductSold.sys_id; 
  coveredPS.insert(); 
  log.info('DEBUG new record inserted ' + coveredPS.number); 
 } else { 
  log.info('DEBUG Product Sold not found: ' + ps[i]); 
 } 
} 
