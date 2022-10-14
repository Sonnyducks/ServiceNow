//NOTE:  this URL is for HR Cases.  
//ENHANCEMENT:  Need to adjust for other ticket types.

(function runMailScript(/* GlideRecord */ current, /* TemplatePrinter */ template,

/* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action,

/* Optional GlideRecord */ event) {

  var url = '<a href="' + gs.getProperty('glide.servlet.uri') + 'esc?id=hrm_ticket_page&table=' + current.sys_class_name + '&sys_id=' + current.sys_id + '">Link</a>';

  template.print(url);

})(current, template, email, email_action, event);
