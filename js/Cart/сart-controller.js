var cars=[
	{
		id_order:  1,
		car_model: 'Audi',
		car_type:  'RS',
		speed:     320,
		car_image: 'images/audi-rs.jpg',
		price:     100000
	},

	{
		id_order:  2,
		car_model: 'Lamborghini',
		car_type:  'Murcielago',
		speed:     342,
		car_image: 'images/lamboghini murcielago.jpg',
		price:     300000
	}
]


function set_images()
{
	var elements = document.querySelectorAll('model element')

	for(var i in elements)
	{
		if(typeof elements[i] != 'object')
			continue

		var image = document.createElement('img')
		var car_image = elements[i].querySelector('car_image')

		image.src = car_image.innerHTML
		image.alt = car_image.innerHTML
		elements[i].appendChild(image)
		elements[i].removeChild(car_image)
	}
}


function set_cart_events()
{
	var cart      =  document.querySelector('model[name="cars"]')
	var elements  =  cart.querySelectorAll('element')
	var element
	var remove

	for(var i in elements)
	{
		element = elements[i]

		if(element.tagName)
		{
			remove = element.querySelector('.remove')
			remove.id_order = parseInt(element.querySelector('id_order').innerHTML)

			remove.onclick = function()
			{
				//send('delete/')
				cart.querySelector('array').removeChild(this.parentNode)
			}
		}
	}
}


set_model('cars', cars)
set_images()
set_cart_events()