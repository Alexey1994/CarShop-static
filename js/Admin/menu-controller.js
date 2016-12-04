function show_menu()
{
	show_viewer('menu')
}


function show_cars_editor()
{
	show_viewer('cars_editor')
	update_page('RU')
}


function show_orders()
{
	show_viewer('orders')
	get_orders()
}


function show_new_car()
{
	show_viewer('new_car')
}