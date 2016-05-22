//Tab Focus 
g_tabs2Sections.setActive(1);

//Hide a Tab (section) 
var section = $$('span[tab_caption="<tab_name>"]')[0].select('span[id*=section.]')[0]; 
section.hide();
