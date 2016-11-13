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


function set_new_car()
{
	document.querySelector('.search-menu').style.display = 'none'
	document.querySelector('.cars').style.display = 'none'
	document.querySelector('.new-car-wrapper').style.display = 'block'
}


function cancel_save_new_car()
{
	document.querySelector('.search-menu').style.display = 'block'
	document.querySelector('.cars').style.display = 'block'
	document.querySelector('.new-car-wrapper').style.display = 'none'
}


function save_new_car()
{
	document.querySelector('.search-menu').style.display = 'block'
	document.querySelector('.cars').style.display = 'block'
	document.querySelector('.new-car-wrapper').style.display = 'none'
}