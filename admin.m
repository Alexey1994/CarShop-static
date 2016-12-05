<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>#title
		<link rel="stylesheet" href="css/style.css">

	<body>
		<div class="admin_viewer">
			<view name="user">
				<registrator>
					Admin
					<input type="text" placeholder="#login" class="login">
					<input type="password" placeholder="#password" class="password">
					<button class="login" onclick="register()">#sign_out
					<button class="login" onclick="login()">#sign_in

			<view name="menu">
				<registrator>
					<button class="logout" onclick="logout()">Выйти

				<menu_elements>
					<button onclick="show_cars_editor()">Редактирование автомобилей
					<button onclick="show_orders()">Просмотр заказов

			<view name="new_car">
				<input type="text" placeholder="Марка" id="new_car_brand">
				<input type="text" placeholder="Модель" id="new_car_model">
				<input type="text" placeholder="Цвет" id="new_car_color">
				<input type="text" placeholder="Скорость" id="new_car_speed">
				<input type="text" placeholder="Мощность" id="new_car_power">
				<input type="text" placeholder="Год выпуска" id="new_car_year_of_manufacture">
				<input type="text" placeholder="Цена" id="new_car_price">
				<button onclick="add_new_car()">Добавить
				<button onclick="show_cars_editor()">Отмена

			<view name="orders">
				<orders>
				<button onclick="show_menu()">Назад

			<view name="cars_editor">
				<div class="search-menu">
					<div class="search-panel">
						<selected_cars>

						<div class="divider">#model_car:
						<select_brand>

						<div class="divider">#type_car:
						<select_model>
						<button onclick="add_car_criteria()" class="add-car-criteria">Добавить ещё

						<hr>
						<selected_colors>

						Цвет:
						<select_color>
						<button onclick="add_color()" class="add-car-criteria">Добавить ещё

						<hr>
						<div class="divider">Мощность:
						<input type="number" placeholder="#from" class="price" oninput="set_power_begin(this)" id="input_begin_power">
						<input type="number" placeholder="#to" class="price" oninput="set_power_end(this)" id="input_end_power">

						<div class="divider">Скорость:
						<input type="number" placeholder="#from" class="price" oninput="set_speed_begin(this)" id="input_begin_speed">
						<input type="number" placeholder="#to" class="price" oninput="set_speed_end(this)" id="input_end_speed">

						<div class="divider">Год выпуска:
						<input type="number" placeholder="#from" class="price" oninput="set_year_of_manufacture_begin(this)" id="input_begin_year_of_manufacture">
						<input type="number" placeholder="#to" class="price" oninput="set_year_of_manufacture_end(this)" id="input_end_year_of_manufacture">

						<div class="divider">Цена:
						<input type="number" placeholder="#from" class="price" oninput="set_price_begin(this)" id="input_begin_price">
						<input type="number" placeholder="#to" class="price" oninput="set_price_end(this)" id="input_end_price">

						<button class="search-button" onclick="add_state('current_page', 1); search()">#find
						<button class="search-button" onclick="show_new_car()">Новый автомобиль
						<button class="search-button" onclick="show_menu()">Назад

				<div class="cars">
					<div class="search-order">
						<span>сортировать по:
						<button class="type" parameter="power">Мощность
						<button class="type" parameter="speed">Скорость
						<button class="type" parameter="year_of_manufacture">Год выпуска
						<button class="type" parameter="price">Цена
						<span>порядок:
						<button class="order" onclick="set_order(this)">&darr;

					<cars>

					<div class="pages">
						<pages>

		<script src="js/libraries/API.js">
		<script src="js/libraries/localizator.js">
		<script src="js/libraries/state saver.js">
		<script src="js/libraries/from JSON to XML converter.js">

		<script src="js/Admin/viewer-controller.js">
		<script src="js/Admin/user-controller.js">
		<script src="js/Admin/menu-controller.js">

		<script src="js/Main/search-controller.js">
		<script src="js/Main/pagination-controller.js">
		<script src="js/Admin/cars-controller.js">

		<script src="js/Admin/add-controller.js">
		<script src="js/Admin/orders-controller.js">
		<script src="js/Admin/main.js">