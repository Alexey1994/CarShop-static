var viewer_form={
	get_viewer: function(){ return document.querySelector('.viewer') },
	get_views:  function(){ return document.querySelectorAll('.viewer view') }
}


function show_viewer(name)
{
	var viewer = viewer_form.get_viewer()
	var views  = viewer_form.get_views()

	viewer.style.display = 'block'

	for(var i in views)
	{
		var view = views[i]

		if(!view.style)
			continue

		if(view.getAttribute('name') == name)
			view.style.display = 'block'
		else
			view.style.display = 'none'
	}
}


function hide_viewer()
{
	var viewer = viewer_form.get_viewer()

	viewer.style.display = 'none'
}