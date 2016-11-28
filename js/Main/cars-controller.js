function view_images(images)
{
	var JSON_images = []

	images = JSON.parse(images)

	console.log(images)

	for(var i in images)
	{
		JSON_images.push({
			img: {
				attributes:{
					src: 'images/' + images[i]
				}
			}
		})
	}

	add_JSON_to_HTML('.viewer car_images', JSON_images)
	show_viewer('images')
}


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

		var car = JSON_cars[i]

		var new_car = {
			image:{
				attributes:{
					src:     'images/' + car.images[0],
					images:  JSON.stringify(car.images),
					onclick: "view_images(this.getAttribute('images'))"
				}
			},

			name:{
				brand: car.brand,
				model: car.model
			},

			descriptions:{},

			price: car.price + ' BYN',
				
			button:{
					
				attributes:{
					class: 'add',
					onclick: "console.log(this)"
				},

				span: 'Добавить в корзину'
			},

			id: car.id
		}

		if(car.power)
			new_car.descriptions.power = car.power + ' л.с., '

		if(car.speed)
			new_car.descriptions.speed = car.speed + ' км/ч, '

		if(car.year_of_manufacture)
			new_car.descriptions.year_of_manufacture = car.year_of_manufacture + ' г., '

		if(car.color)
			new_car.descriptions.color = car.color

		cars.push({
			car: new_car
		})
	}

	add_JSON_to_HTML('cars', cars)
}