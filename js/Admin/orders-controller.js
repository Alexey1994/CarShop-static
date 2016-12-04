function get_orders()
{
	add_JSON_to_HTML('orders', {
		car_id: 1,
		date:   new Date(123).toString()
	})

	get('get_orders', function(orders)
	{
		var new_orders = []

		orders = JSON.parse(orders)

		for(var i in orders)
		{
			var order = {
				car_id:   orders[i].car_id + ' ',
				date:     new Date(orders[i].date).toString() + ' ',
				customer: orders[i].customer_id
			}

			new_orders.push({order: order})
		}

		add_JSON_to_HTML('orders', new_orders)
	})

	console.log(new Date(123).toString())
}