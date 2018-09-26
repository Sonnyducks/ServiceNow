try {
	var s = new sn_ws.SOAPMessageV2('AS Oracle Loctions', 'process');
	
	//override authentication profile
	//authentication type ='basic'
	//r.setAuthentication(authentication type,profile name);
	
	s.setStringParameterNoEscape('Request.InstanceName', '');
	var response = s.execute();
	var responseBody = response.getBody();
	var status = response.getStatusCode();
	
	//gs.print('DEBUG: ' + status);
	//gs.print('DEBUG: ' + responseBody);
	var xmlDoc = new XMLDocument2();
	xmlDoc.parseXML(responseBody);
	
	//Get content of the response node, that's where our data is
	var node = xmlDoc.getNode('//Response');
	//gs.print('DEBUG: ' + node);
	var loc = node.getChildNodeIterator();
	
	while (loc.hasNext()) {
		var n = loc.next();
		var rec = new XMLDocument2();
		rec.parseXML(n);
		
		//get location data
		var location_id = rec.getNode('//Location_id').getTextContent();
		var location_code = rec.getNode('//Location_code').getTextContent();
		var description = rec.getNode('//Description').getTextContent();
		var inactive_date = rec.getNode('//Inactive_date').getTextContent();
		var style = rec.getNode('//Style').getTextContent();
		var address_1 = rec.getNode('//Address_line_1').getTextContent();
		var address_2 = rec.getNode('//Address_line_2').getTextContent();
		var address_3 = rec.getNode('//Address_line_3').getTextContent();
		var city = rec.getNode('//Town_or_city').getTextContent();
		var postal_code = rec.getNode('//Postal_code').getTextContent();
		var region_1 = rec.getNode('//Region_1').getTextContent();
		var region_2 = rec.getNode('//Region_2').getTextContent();
		var telephone_1 = rec.getNode('//Telephone_number_1').getTextContent();
		var telephone_2 = rec.getNode('//Telephone_number_2').getTextContent();
		var telephone_3 = rec.getNode('//Telephone_number_3').getTextContent();
		var country = rec.getNode('//Country').getTextContent();
		
		//put location data into location import set table
		var newLoc = new GlideRecord('u_as_locations');
		newLoc.initialize();
		newLoc.setValue('u_location_id', location_id);
		newLoc.setValue('u_location_code', location_code);
		newLoc.setValue('u_city', city);
		newLoc.setValue('u_country', country);
		newLoc.setValue('u_description', description);
		newLoc.setValue('u_inactive_date', inactive_date);
		newLoc.setValue('u_postal_code', postal_code);
		newLoc.setValue('u_region_1', region_1);
		newLoc.setValue('u_region_2', region_2);
		newLoc.setValue('u_style', style);
		newLoc.setValue('u_telephone_1', telephone_1);
		newLoc.setValue('u_telephone_2', telephone_2);
		newLoc.setValue('u_telephone_3', telephone_3);
		newLoc.setValue('u_address_1', address_1);
		newLoc.setValue('u_address_2', address_2);
		newLoc.setValue('u_address_3', address_3);
		
		newLoc.setValue('u_import_source', 'Oracle WS Import');
		newLoc.insert();

		//gs.print('DEBUG: ' + region_1 + ":" + region_2);
	}
	
	
}

catch(ex) {
	var message = ex.getMessage();
}