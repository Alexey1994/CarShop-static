function update_page(language)
{
	document.body.style = "display: none"
	
	refresh_state()
	add_state('language', language)

	get('localization/index_' + language + '.json', function(language)
	{
		language = JSON.parse(language)

		localize(language)

		authenticate()
		update_search_orders()
		get_car_brands()
		get_colors()

		//set_model('cart', {cart_count: 0})

		if(state.selected_cars)
		{
			selected_cars = JSON.parse(state.selected_cars)
			update_selected_cars()
		}

		if(state.selected_colors)
		{
			selected_colors = JSON.parse(state.selected_colors)
			update_selected_colors()
		}

		search()

		document.body.style = "display: block"
		document.body.setAttribute('class', 'show')
	})
}


refresh_state()

if(state.language)
	update_page(state.language)
else
	update_page('RU')