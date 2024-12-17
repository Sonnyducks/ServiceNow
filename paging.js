var userCount = 6770;
var usersPerPage = 5000;
var pages = Math.ceil((userCount / usersPerPage));

var i = 0;
while (i<pages) {
  console.log("Page: "+i);
  i++;
}
