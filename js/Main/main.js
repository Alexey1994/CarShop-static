function update_page(language)
{
	document.body.style = "display: none"
	
	refresh_state()
	add_state('language', language)

	get('localization/index_' + language + '.json', function(language)
	{
		language = JSON.parse(language)
		window.language = language

		localize(language)

		authenticate()
		update_search_orders()
		get_car_brands()
		get_colors()

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
		render_cart()

		document.body.style = "display: block"
		document.body.setAttribute('class', 'show')
	})
}


refresh_state()

if(state.language)
	update_page(state.language)
else
	update_page('RU')


get('http://www.nbrb.by/API/ExRates/Rates?Periodicity=0', function(data)
{
	data = JSON.parse(data)

	var rates = []

	for(var i in data)
	{
		var rate={
			name: data[i].Cur_Name,
			rate: data[i].Cur_OfficialRate + ' BYN'
		}

		rates.push({block: rate})
	}

	add_JSON_to_HTML('currency_exchange_rate', rates)
})