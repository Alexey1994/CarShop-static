function render_cars(JSON_cars)
{
	var cars = []

	for(var i in JSON_cars)
	{
		JSON_cars[i].button={
			attributes:{
				class: 'add',
				onclick: "console.log(this)"
			},
			span: 'Добавить в корзину'
		}

		cars.push({
			car: JSON_cars[i]
		})
	}

	add_JSON_to_HTML('cars', cars)
}