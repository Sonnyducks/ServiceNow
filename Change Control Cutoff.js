//USE:  Check if a change has been submitted BEFORE change control and is scheduled to occur AFTER change control
//Test Code...change dates to something recent
var submit = new GlideDateTime("2015-11-01 08:00:00"); 
var planStart = new GlideDateTime("2015-11-04 15:00:00"); 
var changeCutoff = getChangeCutoffDate(submit); 
gs.print('Change cutoff time is ' + changeCutoff); 
 
if (submit <= changeCutoff && planStart > changeCutoff) { 
 gs.print('Change is OK'); 
} else { 
 gs.print('Change is too late'); 
} 
 
function getChangeCutoffDate(d) { 
 var changeCutoffDay = 3;  //1=Monday...7=Sunday 
 var returnDate = new GlideDateTime(d); 
 var day = returnDate.getDayOfWeekLocalTime(); 
 if (day == 7) {day = 0;}   //if Sunday set to 0 instead of 7 
  gs.print('Change start day of the week is ' + day); 
 
 if (day <= changeCutoffDay ) { 
  return returnDate.getInternalMidnight(changeCutoffDay); 
 } 
 
 if (day > changeCutoffDay) { 
  returnDate.addWeeksLocalTime(1); 
  return returnDate.getInternalMidnight(changeCutoffDay); 
 } 
} 
