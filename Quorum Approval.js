//USE:  Workflow approval activity script

var percentApproved = counts.approved / counts.total * 100; 
var percentRejected = counts.rejected / counts.total * 100; 
var percentResponded = (counts.approved + counts.rejected) / counts.total * 100; 
if (percentResponded > 50) { 
if (percentApproved > 50) 
 answer = 'approved'; 
 
if (percentRejected > 50) 
 answer = 'rejected'; 
}
