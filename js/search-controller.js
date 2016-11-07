var select_car_type = document.getElementById('select_car_type')


function set_select_options(select, array_options)
{
	var options = ''

	for(var i in array_options)
		options += '<option>' + array_options[i] + '</option>'

	select.innerHTML = options
}


function get_car_types()
{
	var car_parameters = get_input('car_parameters')

	get('car_types/' + car_parameters.type_car, function(data)
	{
		set_select_options(select_car_type.querySelector('select'), JSON.parse(data))
	})
}


function search()
{
	console.log(get_input('car_parameters'))
}


get_input('car_parameters')