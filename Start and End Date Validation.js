if ((!current.work_start.nil()) && (!current.work_end.nil())) { 
    var start = current.work_start.getGlideObject().getNumericValue(); 
    var end = current.work_end.getGlideObject().getNumericValue(); 
    if (start > end) { 
  current.work_start.setError('start must be before end'); 
  current.work_end.setError('start must be before end'); 
        gs.addErrorMessage('Work Start date must be before Work End date'); 
        current.setAbortAction(true); 
    } 
}
