var cars=[
	{
		car_model: 'Audi',
		car_type:  'RS',
		speed:     320,
		car_image: 'images/audi-rs.jpg',
		price:     100000
	},

	{
		car_model: 'Lamborghini',
		car_type:  'Murcielago',
		speed:     342,
		car_image: 'images/lamboghini murcielago.jpg',
		price:     300000
	}
]


function update_page(language)
{
	refresh_state()
	add_state('language', language)

	get('localization/index_' + language + '.json', function(language)
	{
		language = JSON.parse(language)

		localize(language)

		update_arrays(document)

		set_model('cars', cars)
		set_images()

		set_model('cart', {cart_count: 0})
		get_input('car_parameters')

		set_pages_count(30)
		set_search_types_events()

		if(state.selected_cars)
		{
			cars_criteria = JSON.parse(decodeURI(state.selected_cars))
			update_car_criteria()
		}
	})
}


refresh_state()

if(state.language)
	update_page(state.language)
else
	update_page('RU')