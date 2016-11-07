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


set_model('cars', cars)
set_images()