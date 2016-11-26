var selected_cars   = []
var selected_colors = []


var search_form={
	get_car_brand:                 function() { return document.querySelector('select_brand select') },
	get_car_model:                 function() { return document.querySelector('select_model select') },
	get_car_color:                 function() { return document.querySelector('select_color select') },
	get_begin_power:               function() { return document.getElementById('input_begin_power') },
	get_end_power:                 function() { return document.getElementById('input_end_power') },
	get_begin_speed:               function() { return document.getElementById('input_begin_speed') },
	get_end_speed:                 function() { return document.getElementById('input_end_speed') },
	get_begin_year_of_manufacture: function() { return document.getElementById('input_begin_year_of_manufacture') },
	get_end_year_of_manufacture:   function() { return document.getElementById('input_end_year_of_manufacture') },
	get_begin_price:               function() { return document.getElementById('input_begin_price') },
	get_end_price:                 function() { return document.getElementById('input_end_price') }
}


function update_search_inputs()
{
	if(state.selected_brand)
		search_form.get_car_brand().value = state.selected_brand

	if(state.selected_model)
		search_form.get_car_model().value = state.selected_model

	if(state.power_begin)
		search_form.get_begin_power().value = state.power_begin

	if(state.power_end)
		search_form.get_end_power().value = state.power_end

	if(state.speed_begin)
		search_form.get_begin_speed().value = state.speed_begin

	if(state.speed_end)
		search_form.get_end_speed().value = state.speed_end

	if(state.year_of_manufacture_begin)
		search_form.get_begin_year_of_manufacture().value = state.year_of_manufacture_begin

	if(state.year_of_manufacture_end)
		search_form.get_end_year_of_manufacture().value = state.year_of_manufacture_end

	if(state.price_begin)
		search_form.get_begin_price().value = state.price_begin

	if(state.price_end)
		search_form.get_end_price().value = state.price_end
}


function get_car_brands()
{
	var brands = JSON.parse( sync_get('get_brands/') )
	var HTML_options = []

	for(var i in brands)
		HTML_options.push({
			option: brands[i]
		})

	var JSON_select = {
		select: HTML_options
	}

	JSON_select.select.attributes={
		onchange: "state.selected_brand=undefined; state.selected_model=undefined; get_car_models(this.value)",
		class:    'type-car'
	}

	add_JSON_to_HTML('select_brand', JSON_select)

	if(state.selected_brand)
		get_car_models(state.selected_brand)
	else
		get_car_models(brands[0])
}


function get_car_models(brand)
{
	var models          = JSON.parse(sync_get('get_models/' + brand))
	var HTML_options    = []

	for(var i in models)
		HTML_options.push({
			option: models[i]
		})

	var JSON_select = {
		select: HTML_options
	}

	JSON_select.select.attributes={
		class: 'type-car',
		onchange: "add_state('selected_model', this.value)"
	}

	if(!state.selected_model)
		add_state('selected_model', models[0])

	add_JSON_to_HTML('select_model', JSON_select)
	add_state('selected_brand', brand)
	update_search_inputs()
}


function get_colors()
{
	var colors       = JSON.parse(sync_get('get_colors'))
	var HTML_options = []

	for(var i in colors)
		HTML_options.push({
			option: colors[i]
		})

	var JSON_select = {
		select: HTML_options
	}

	JSON_select.select.attributes={
		class: 'type-car'//,
		//onchange: "add_state('selected_model', this.value)"
	}

	add_JSON_to_HTML('select_color', JSON_select)
}


function update_selected_cars()
{
	var new_selected_cars = []

	for(var i in selected_cars)
	{
		new_selected_cars.push({
			car:{
				brand: selected_cars[i].brand,
				model: selected_cars[i].model,
				del:{
					text: 'x',
					attributes:{
						onclick: 'delete_car_criteria(this.parentNode)'
					}
				}
			}
		})
	}

	add_JSON_to_HTML('selected_cars', new_selected_cars)
}


function add_car_criteria()
{
	var criteria = {
		brand: search_form.get_car_brand().value,
		model: search_form.get_car_model().value
	}

	for(var i in selected_cars)
	{
		if(selected_cars[i].brand == criteria.brand &&
		   selected_cars[i].model == criteria.model)
		{
			var added_cars = document.querySelectorAll('selected_cars car')

			for(var j in added_cars)
				if(added_cars[j].tagName)
				if(added_cars[j].querySelector('brand').innerHTML == criteria.brand &&
				   added_cars[j].querySelector('model').innerHTML == criteria.model)
				{
					var element = added_cars[j]
					element.setAttribute('class', 'error')

					setTimeout(function()
					{	
						element.setAttribute('class', '')
					}, 200)
				}

			return
		}
	}

	selected_cars.push(criteria)
	update_selected_cars()
	add_state('selected_cars', JSON.stringify(selected_cars))
}


function delete_car_criteria(del)
{
	var brand             = del.querySelector('brand').innerHTML
	var model             = del.querySelector('model').innerHTML
	var new_cars_criteria = []

	for(var i in selected_cars)
		if(selected_cars[i].brand != brand ||
		   selected_cars[i].model != model)
			new_cars_criteria.push(selected_cars[i])

	del.parentNode.removeChild(del)
	selected_cars = new_cars_criteria
	add_state('selected_cars', JSON.stringify(selected_cars))
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


function update_search_orders()
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


function set_price_begin(input)
{
	if(parseInt(input.value) > parseInt(search_form.get_end_price().value))
	{
		input.setAttribute('class', 'price error')

		setTimeout(function()
		{	
			input.setAttribute('class', 'price')
		}, 200)
	}

	add_state('price_begin', input.value)
}


function set_price_end(input)
{
	if(parseInt(input.value) < parseInt(search_form.get_begin_price().value))
	{
		input.setAttribute('class', 'price error')

		setTimeout(function()
		{	
			input.setAttribute('class', 'price')
		}, 200)
	}

	add_state('price_end', input.value)
}


function set_power_begin(input)
{
	if(parseInt(input.value) > parseInt(search_form.get_end_power().value))
	{
		input.setAttribute('class', 'price error')

		setTimeout(function()
		{	
			input.setAttribute('class', 'price')
		}, 200)
	}

	add_state('power_begin', input.value)
}


function set_power_end(input)
{
	if(parseInt(input.value) < parseInt(search_form.get_begin_power().value))
	{
		input.setAttribute('class', 'price error')

		setTimeout(function()
		{	
			input.setAttribute('class', 'price')
		}, 200)
	}

	add_state('power_end', input.value)
}


function set_speed_begin(input)
{
	if(parseInt(input.value) > parseInt(search_form.get_end_speed().value))
	{
		input.setAttribute('class', 'price error')

		setTimeout(function()
		{	
			input.setAttribute('class', 'price')
		}, 200)
	}

	add_state('speed_begin', input.value)
}


function set_speed_end(input)
{
	if(parseInt(input.value) < parseInt(search_form.get_begin_speed().value))
	{
		input.setAttribute('class', 'price error')

		setTimeout(function()
		{	
			input.setAttribute('class', 'price')
		}, 200)
	}

	add_state('speed_end', input.value)
}


function set_year_of_manufacture_begin(input)
{
	if(parseInt(input.value) > parseInt(search_form.get_end_year_of_manufacture().value))
	{
		input.setAttribute('class', 'price error')

		setTimeout(function()
		{	
			input.setAttribute('class', 'price')
		}, 200)
	}

	add_state('year_of_manufacture_begin', input.value)
}


function set_year_of_manufacture_end(input)
{
	if(parseInt(input.value) < parseInt(search_form.get_begin_year_of_manufacture().value))
	{
		input.setAttribute('class', 'price error')

		setTimeout(function()
		{	
			input.setAttribute('class', 'price')
		}, 200)
	}

	add_state('year_of_manufacture_end', input.value)
}


function update_selected_colors()
{
	var JSON_colors = []

	for(var i in selected_colors)
	{
		JSON_colors.push({
			color:{
				text: selected_colors[i],
				del:{
					text: 'x',
					attributes:{
						onclick: "delete_color(this)"
					} 
				}
			}
		})
	}

	add_JSON_to_HTML('selected_colors', JSON_colors)
}


function add_color()
{
	var added_color = search_form.get_car_color().value

	for(var i in selected_colors)
	{
		if(added_color == selected_colors[i])
		{
			var added_colors = document.querySelectorAll('selected_colors color')

			for(var j in added_colors)
				if(added_colors[j].tagName)
				if(added_colors[j].querySelector('text').innerHTML == added_color)
				{
					var element = added_colors[j]
					element.setAttribute('class', 'error')

					setTimeout(function()
					{	
						element.setAttribute('class', '')
					}, 200)
				}

			return
		}
	}

	selected_colors.push(added_color)
	update_selected_colors()
	add_state('selected_colors', JSON.stringify(selected_colors))
}


function delete_color(element)
{
	var deleted_element = element.parentNode
	var deleteted_color = deleted_element.querySelector('text').innerHTML
	var new_colors      = []

	for(var i in selected_colors)
		if(selected_colors[i] != deleteted_color)
			new_colors.push(selected_colors[i])

	deleted_element.parentNode.removeChild(deleted_element)
	selected_colors = new_colors
	add_state('selected_colors', JSON.stringify(selected_colors))
}


function get_selected_cars()
{
	var selected_cars = state.selected_cars

	if(selected_cars)
	{
		selected_cars = JSON.parse(selected_cars)

		selected_cars.push({
			brand: search_form.get_car_brand().value,
			model: search_form.get_car_model().value
		})
	}
	else
	{
		selected_cars = [{
			brand: search_form.get_car_brand().value,
			model: search_form.get_car_model().value
		}]
	}

	return selected_cars
}


function get_selected_colors()
{
	var selected_colors = state.selected_colors

	if(selected_colors)
	{
		selected_colors = JSON.parse(selected_colors)
		selected_colors.push(search_form.get_car_color().value)
	}
	else
		selected_colors = [search_form.get_car_color().value]

	return selected_colors
}


function get_current_page()
{
	if(state.current_page)
		return state.current_page
	else
		return 1
}


function search()
{
	var find_parameters = {
		selected_cars:   get_selected_cars(),
		selected_colors: get_selected_colors(),
		current_page:    get_current_page()
	}

	if(state.power_begin)
		find_parameters.power_begin = state.power_begin

	if(state.power_end)
		find_parameters.power_end = state.power_end

	if(state.speed_begin)
		find_parameters.speed_begin = state.speed_begin

	if(state.speed_end)
		find_parameters.speed_end = state.speed_end

	if(state.year_of_manufacture_begin)
		find_parameters.year_of_manufacture_begin = state.year_of_manufacture_begin

	if(state.year_of_manufacture_end)
		find_parameters.year_of_manufacture_end = state.year_of_manufacture_end

	if(state.price_begin)
		find_parameters.price_begin = state.price_begin

	if(state.price_end)
		find_parameters.price_end = state.price_end

	if(state.order_by)
		find_parameters.order_by = state.order_by

	if(state.order)
		find_parameters.order = state.order

	console.log(find_parameters)

	send('find_cars', JSON.stringify(find_parameters), function(data)
	{
		data = JSON.parse(data)
		console.log(data)

		render_cars(data.result)
		set_pages_count(data.pages, parseInt(state.current_page))
	})
}