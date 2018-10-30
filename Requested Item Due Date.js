//use this to dynamically set the due date of a requested item based off the delivery time in the catalog item definition.
//OOTB ServiceNow calculates due date by the lengh of the workflow stages
//this was a fix script test, need to clean up and put in a business rule or workflow (replace recID w/ current)

var recID = '2bace2c8dbe12780dca43e0b7c9619cc';
reqItem = new GlideRecord('sc_req_item');
reqItem.get('2bace2c8dbe12780dca43e0b7c9619cc');

var tod = new GlideDateTime();
var leadTime = reqItem.cat_item.delivery_time.getGlideObject();
var dueDate = new GlideDateTime();
dueDate.add(leadTime.getNumericValue());

gs.print('Today: ' + tod.getDisplayValue());
gs.print('Duration: ' + leadTime);
gs.print('Due Date: ' + dueDate.getDisplayValue());


reqItem.setValue('due_date', dueDate);
reqItem.update();

