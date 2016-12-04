var cart = []


function open_cart()
{
	show_viewer('cart')
	//window.location = 'cart.html'
}


function delete_from_cart(product_id)
{
	get('remove_product_from_cart/' + product_id, function(status)
	{
		status = JSON.parse(status)

		if(status.status != 'Ok')
		{
			alert(status.status)
			return
		}

		render_cart()
	})
}


function confirm_purchase()
{
	get('get_cart', function(products)
	{
		products = JSON.parse(products)

		for(var i in products)
		{
			sync_get('confirm_purchase/' + products[i].car_id, function(status){})
			sync_get('remove_product_from_cart/' + products[i].id, function(status){})
		}

		render_cart()

		//console.log(products)
	})
}


function render_cart_count(count)
{
	if(!count)
		add_JSON_to_HTML('cart_count', 'не выбрано ни одного товара')
	else if(count%10 >= 2 && count%10 <= 4 && (count%100 < 10 || count%100 > 19))
		add_JSON_to_HTML('cart_count', count + ' товара')
	else if(count%10 == 1 && count%100 != 11)
		add_JSON_to_HTML('cart_count', count + ' товар')
	else
		add_JSON_to_HTML('cart_count', count + ' товаров')
}


function render_cart()
{
	var new_cart = []
	var price = 0

	get('get_cart', function(cart)
	{
		var cart = JSON.parse(cart)

		for(var i in cart)
		{
			var car = JSON.parse(sync_get('get_car/' + cart[i].car_id))

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
						onclick: "delete_from_cart(this.parentNode.querySelector('order_id').innerHTML)"
					},

					span: 'Убрать'
				},

				//id: car.id,
				order_id: cart[i].id
			}

			if(car.power)
				new_car.descriptions.power = car.power + ' л.с., '

			if(car.speed)
				new_car.descriptions.speed = car.speed + ' км/ч, '

			if(car.year_of_manufacture)
				new_car.descriptions.year_of_manufacture = car.year_of_manufacture + ' г., '

			if(car.color)
				new_car.descriptions.color = car.color

			new_cart.push({
				car: new_car
			})

			price += car.price
		}

		add_JSON_to_HTML('cart_price', price + ' BYN')
		add_JSON_to_HTML('cars_in_cart', new_cart)
		render_cart_count(new_cart.length)
	})
}


function add_to_cart(id)
{
	var order={
		car_id: id
	}

	send('add_product_to_cart', encodeURI(JSON.stringify(order)), function(data)
	{
		data = JSON.parse(data)

		if(data.status == 'Ok')
		{
			get('get_car/' + id, function(car)
			{
				car = JSON.parse(car)
				cart.push(car)
				render_cart()
			})
		}
		else
			alert(data.status)
	})
}