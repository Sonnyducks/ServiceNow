//get last update
current.work_notes.getJournalEntry(-1);

//process all journal updates
var notes = current.work_notes.getJournalEntry(-1); //gets all journal entries as a string where each entry is delimited by '\n\n' 
var na = notes.split("\n\n");                       //stores each entry into an array of strings 

for (var i = 0; i < na.length; i++)                 //loop thru array and do something
  gs.print(na[i]);
