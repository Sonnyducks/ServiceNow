//Use:  Client Scripts
//Tab Focus, '1' is the number of the tab you want active
g_tabs2Sections.setActive(1);

//Hide a Tab (section), replace '<tab_name>' with the name of the tab you want to hide
var section = $$('span[tab_caption="<tab_name>"]')[0].select('span[id*=section.]')[0]; 
section.hide();
