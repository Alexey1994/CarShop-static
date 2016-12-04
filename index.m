<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>#title
		<link rel="stylesheet" href="css/style.css">

	<body style="display: none">
		<div class="viewer">
			<div class="background" onclick="hide_viewer()">
			<div class="images">
				<view name="images">
					<car_images>

				<view name="cart">
					<cars_in_cart>
					<cart_price>
					<button class="order-button" onclick="confirm_purchase()">Оформить заказ

		<div class="header">
			<div class="language-buttons">
				<button onclick="update_page('RU')">Русский
				<button onclick="update_page('EN')">English

			<div class="not_authenticated_user">
				<input type="text" placeholder="#login" class="login">
				<input type="password" placeholder="#password" class="password">
				<button class="login" onclick="register()">#sign_out
				<button class="login" onclick="login()">#sign_in

			<div class="authenticated_user">
				<user>
				<button class="logout" onclick="logout()">Выйти

			<div class="cart" onclick="open_cart()">
				<div class="cart-wrapper" >
					<model name="cart">
						<cart_count>

		<div class="content">
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

		<div class="footer">

		<script src="js/libraries/API.js">
		<script src="js/libraries/localizator.js">
		<script src="js/libraries/state saver.js">
		<script src="js/libraries/from JSON to XML converter.js">

		<script src="js/Main/viewer-controller.js">
		<script src="js/Main/search-controller.js">
		<script src="js/Main/pagination-controller.js">
		<script src="js/Main/cars-controller.js">
		<script src="js/Main/orders-controller.js">
		<script src="js/Main/cart-controller.js">
		<script src="js/Main/user-controller.js">
		<script src="js/Main/main.js">