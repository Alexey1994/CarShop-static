var add_car_form={
	get_brand:               function(){ return document.getElementById('new_car_brand') },
	get_model:               function(){ return document.getElementById('new_car_model') },
	get_color:               function(){ return document.getElementById('new_car_color') },
	get_speed:               function(){ return document.getElementById('new_car_speed') },
	get_power:               function(){ return document.getElementById('new_car_power') },
	get_year_of_manufacture: function(){ return document.getElementById('new_car_year_of_manufacture') },
	get_price:               function(){ return document.getElementById('new_car_price') }
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
console.log(new_car)
	send('add_car', encodeURI(JSON.stringify(new_car)), function(status)
	{
		alert(status)
	})
}