function view_images(images)
{
	var JSON_images = []

	images = JSON.parse(images)

	for(var i in images)
	{
		JSON_images.push({
			img: {
				attributes:{
					src: sync_get('images/' + images[i])
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
		var car = JSON_cars[i]

		var new_car = {
			image:{
				attributes:{
					src:     sync_get('images/' + car.images[0]),
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
					onclick: "add_to_cart(this.parentNode.querySelector('id').innerHTML)"
				},

				span: language.add_to_cart
			},

			id: car.id
		}

		if(car.power)
			new_car.descriptions.power = car.power + language.power_entity

		if(car.speed)
			new_car.descriptions.speed = car.speed + language.speed_entity

		if(car.year_of_manufacture)
			new_car.descriptions.year_of_manufacture = car.year_of_manufacture + language.year_entity

		if(car.color)
			new_car.descriptions.color = car.color

		cars.push({
			car: new_car
		})
	}

	add_JSON_to_HTML('cars', cars)
}