Example of a combined SI

<pre>
var <span style="color:blue">My_Functions</span> = Class.create();
<span style="color:blue">My_Functions</span>.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	<span style="color:green">log_info</span>: function(<b>x0</b>){
		var results = {};
		var <span style="color:red">x</span> = this.getParameter('<span style="color:purple">sysparm_x</span>') <b>|| x0</b>;
		gs.info(<span style="color:red">x</span>);
		<span style="color:darkgray">results.message</span> = <span style="color:orange">'success'</span>;
		return JSON.stringify(results);
	},
	
    type: 'My_Functions'
});

</pre>
