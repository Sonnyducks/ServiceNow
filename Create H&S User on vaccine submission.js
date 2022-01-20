    //CC: Force a H&S User created when a vaccination is submitted.
    var hsUsr = new GlideRecord('sn_imt_core_health_and_safety_user');
    hsUsr.addQuery('user', userId);
    hsUsr.setLimit(1);
    hsUsr.query();

    if (hsUsr.next()) {
        //user has a H&S User record, do nothing
    } else {
        //create a H&S User record
        var newHSU = new GlideRecord('sn_imt_core_health_and_safety_user');
        newHSU.initialize();
        newHSU.setValue('user', userId);
        newHSU.insert();
    }
