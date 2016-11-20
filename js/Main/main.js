function update_page(language)
{
	refresh_state()
	add_state('language', language)

	get('localization/index_' + language + '.json', function(language)
	{
		language = JSON.parse(language)

		localize(language)

		//update_arrays(document)

		search()
		set_images()

		set_model('cart', {cart_count: 0})
		get_input('car_parameters')

		if(state.selected_cars)
		{
			cars_criteria = JSON.parse(decodeURI(state.selected_cars))
			update_car_criteria()
		}

		get_car_brands()
	})
}


refresh_state()

if(state.language)
	update_page(state.language)
else
	update_page('RU')