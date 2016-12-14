function render_cars(JSON_cars)
{
	var cars = []

	for(var i in JSON_cars)
	{
		var car = JSON_cars[i]

		var new_car = {
			image:{
				attributes:{
					src: sync_get('images/' + car.images[0])
				}
			},

			name:{
				brand: car.brand,
				model: car.model
			},

			descriptions:{},

			price: car.price + ' BYN',
			
			buttons:{
				/*
				edit_button:{
					button:{
							
						attributes:{
							onclick: "console.log(this)"
						},

						span: 'Редактировать'
					}
				},*/

				del_button:{
					button:{
							
						attributes:{
							onclick: "console.log(this); delete_car(this.parentNode.parentNode.parentNode.querySelector('id').innerHTML)"
						},

						span: 'Удалить'
					}
				}
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


function delete_car(id)
{
	send('delete_car', id, function(status)
	{
		status = JSON.parse(status)

		if(status.status == 'Ok')
		{
			search()
			return
		}

		alert(status.status)
	})
}