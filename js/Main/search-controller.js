var cars_criteria = []


function set_select_options(select, array_options)
{
	var options = ''

	for(var i in array_options)
		options += '<option>' + array_options[i] + '</option>'

	select.innerHTML = options
}


function get_car_brands()
{
	get('get_brands/', function(data)
	{console.log(data)
		set_select_options(document.querySelector('#select_car_brand select'), JSON.parse(data))
	})
}


function get_car_types()
{
	var select_car_type = document.getElementById('select_car_type')
	var car_parameters  = get_input('car_parameters')

	get('get_models/' + car_parameters.type_car, function(data)
	{
		set_select_options(select_car_type.querySelector('select'), JSON.parse(data))
	})
}


function update_car_criteria()
{
	set_model('car_element', cars_criteria)
}


function add_car_criteria()
{
	var criteria_model = document.querySelector('model[name="car_element"]')
	var user_input     = get_input('car_parameters')
	var criteria = {
		type_car:  user_input.type_car,
		model_car: user_input.model_car
	}

	for(var i in cars_criteria)
	{
		if(cars_criteria[i].type_car == criteria.type_car && cars_criteria[i].model_car == criteria.model_car)
		{
			var added_cars = criteria_model.querySelectorAll('element')

			for(var j in added_cars)
				if(added_cars[j].tagName)
				if(added_cars[j].querySelector('type_car').innerHTML == criteria.type_car &&
				   added_cars[j].querySelector('model_car').innerHTML == criteria.model_car)
				{
					added_cars[j].setAttribute('class', 'error')
					var element = added_cars[j]

					setTimeout(function()
					{	
						element.setAttribute('class', '')
					}, 200)
				} 

			//alert('автомобиль уже добавлен')
			return
		}
	}

	criteria.del = 'X'

	cars_criteria.push(criteria)
	update_car_criteria()
	add_state('selected_cars', JSON.stringify(cars_criteria))
}


function delete_car_criteria(del)
{
	var element           = del.parentNode
	var type_car          = element.querySelector('type_car').innerHTML
	var model_car         = element.querySelector('model_car').innerHTML
	var model_array       = document.querySelector('model[name="car_element"] array')
	var new_cars_criteria = []

	for(var i in cars_criteria)
		if(cars_criteria[i].type_car != type_car || cars_criteria[i].model_car != model_car)
			new_cars_criteria.push(cars_criteria[i])

	model_array.removeChild(element)
	cars_criteria = new_cars_criteria
	add_state('selected_cars', JSON.stringify(cars_criteria))
}


function update_pages_events()
{
	var pages = document.querySelectorAll('model[name="page_navigation"] element')

	for(var i in pages)
		if(pages[i].tagName)
			pages[i].onclick = function()
			{
				console.log(this.innerHTML)
				add_state('current_page', this.innerHTML)
				search()
			}
}


function set_pages_count(pages_count)
{
	var pages = []

	for(var i=1; i<=pages_count; i++)
		pages.push(i)

	set_model('page_navigation', pages)
	update_pages_events()
}


function search()
{
	var find_parameters = get_input('car_parameters')
	var selected_cars   = state.selected_cars

	if(find_parameters.type_car)
	{
		if(selected_cars)
		{
			selected_cars = JSON.parse(decodeURI(selected_cars))
			selected_cars.push({type_car: find_parameters.type_car,
			                    model_car: find_parameters.model_car})
		}
		else
			selected_cars = {type_car: find_parameters.type_car,
			                 model_car: find_parameters.model_car}
	}

	if(selected_cars)
		find_parameters.selected_cars = selected_cars

	if(state.current_page)
		find_parameters.current_page = state.current_page

	send('find_cars', JSON.stringify(find_parameters), function(data)
	{
		data = JSON.parse(data)

		set_pages_count(data.pages + 1)
		set_search_types_events()

		set_model('cars', data.result)

		var car = document.querySelector('model[name="cars"]')

		if(data.result.length)
			car.style.display = 'block'
		else
			car.style.display = 'none'

		var cars = document.querySelectorAll('model[name="cars"] element')

		for(var i in cars)
		{
			if(cars[i].innerHTML)
			{
				var childs = cars[i].childNodes

				for(var k in childs)
					if(childs[k].tagName && childs[k].innerHTML.length == 0)
						childs[k].innerHTML = '-'
			}
		}
	})

	update_pages_events()
}


function set_order(element)
{
	if(!element.order)
	{
		element.order = true
		element.innerHTML = '&uarr;'
	}
	else
	{
		element.order = false
		element.innerHTML = '&darr;'
	}

	console.log(element.order? 'asc': 'desc')
	add_state('order', element.order? 'asc': 'desc')
}


function set_search_types_events()
{
	var types = document.querySelectorAll('.search-order .type')

	for(var i in types)
		if(types[i].tagName)
			types[i].onclick = function()
			{
				console.log(this.getAttribute('parameter'))
				add_state('order_by', this.getAttribute('parameter'))
			}
}