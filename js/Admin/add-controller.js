var add_car_form={
	get_brand:               function(){ return document.getElementById('new_car_brand') },
	get_model:               function(){ return document.getElementById('new_car_model') },
	get_color:               function(){ return document.getElementById('new_car_color') },
	get_speed:               function(){ return document.getElementById('new_car_speed') },
	get_power:               function(){ return document.getElementById('new_car_power') },
	get_year_of_manufacture: function(){ return document.getElementById('new_car_year_of_manufacture') },
	get_price:               function(){ return document.getElementById('new_car_price') },
	get_images:              function(){ return document.querySelector('images') }
}


function add_new_car()
{
	var new_car={
		brand:               add_car_form.get_brand().value,
		model:               add_car_form.get_model().value,
		color:               add_car_form.get_color().value,
		speed:               add_car_form.get_speed().value,
		power:               add_car_form.get_power().value,
		year_of_manufacture: add_car_form.get_year_of_manufacture().value,
		price:               add_car_form.get_price().value
	}

	var HTML_images = add_car_form.get_images().querySelectorAll('img')
	var images      = []

	for(var i in HTML_images)
		if(HTML_images[i].image_data)
			images.push( HTML_images[i].image_data )

	new_car.images = images

	send('add_car', JSON.stringify(new_car), function(status)
	{
		alert(status)
	})
}


function update_image(file_element)
{
	var image = file_element.parentNode.querySelector('img')

	load_file_as_URL(file_element, function(image_data)
	{
		image.src = image_data
		image.image_data = image_data
	})
}


function add_image()
{
	var new_input={
		input:{
			attributes:{
				type: "file",
				onchange: "update_image(this)"
			}
		},

		img:{
			attributes:{
				src: "images/empty.png"
			}
		}
	}

	var HTML_image = convert_from_JSON_to_XML({car_image: new_input})

	add_car_form.get_images().appendChild(HTML_image)
}