    //use in a business rule on the sys_email table for Outbox inserts.
    //needs HR module/HR Profileds installed.  If not, update accordingly.
    //needs custom field for 'Email Preference' on the HR table also
    
    var original = current.recipients;
    var modArray = [];
    var modified = "";

    var recips = original;
    var testArr = recips.split(',');
    //gs.info("# of recipients: " + testArr.length);

    for (var i = 0; i < testArr.length; i++) {
        //gs.info("EMAIL DEBUG: Processing " + testArr[i]);
		
		//get HR profile of each email recipient 
        var hrProfile = new GlideRecord('sn_hr_core_profile');
        hrProfile.addQuery('user.email', testArr[i]);
        hrProfile.query();
        if (hrProfile.next()) {
			//debug stuff
            //gs.info("Profile found: " + hrProfile.getDisplayValue());
            //gs.info("Personal email: " + hrProfile.getValue('personal_email'));
            //gs.info("Notify method: " + hrProfile.getValue("u_user_email_preference"));
			
			//test if on leave or wants to use personal email, if so replace
            var notifyMethod = hrProfile.getValue("u_user_email_preference");
			var leaveStatus = hrProfile.getValue("leave_status");
            if (notifyMethod == "Personal" || leaveStatus == "on_leave") {
                modArray.push(hrProfile.getValue('personal_email'));
            } else {
				//not on leave or pref personal email...use original email
                modArray.push(testArr[i]);
            }
        } else {
			//no profile found...use original email
            modArray.push(testArr[i]);
		}
    }
	
	current.recipients = modArray.toString();
