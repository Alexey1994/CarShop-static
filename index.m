<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>CarShop
		<link rel="stylesheet" href="css/style.css">

	<body>

	<div class="header">
		<div class="user">
			<input type="text" placeholder="Логин" class="login">
			<input type="password" placeholder="Пароль" class="password">
			<button class="login">Зарегистрироваться
			<button class="login">Войти

		<div class="cart">
			<div class="cart-wrapper" onclick="open_cart()">
				<model name="cart">
					<cart_count>
					товаров

	<div class="content">
		<div class="search-menu">
			<div class="search-panel">
				<user_input name="car_parameters">

					Марка автомобиля:
					<type_car type="select" class="type-car" onchange="get_car_types()">
						<option>Любая
						<option>Acura
						<option>Alfa Romeo
						<option>Audi
						<option>BMW
						<option>Chery
						<option>Chevrolet

					Тип автомобиля:
					<model_car type="select" class="type-car" id="select_car_type">
						<option>Любой

					<price_begin type="text" placeholder="цена от" class="price" oninput="validate_price_begin()">
					<price_end type="text" placeholder="цена до" class="price">

				<button class="search-button" onclick="search()">Подобрать

		<div class="cars">
			<model name="cars">
				<array>
					<div class="descriptions">
						<div class="model-description">
							Модель:
						<div class="type-description">
							Тип:
						<div class="speed-desription">
							Максимальная скорость:
						<div class="price-desription">
							Цена:
					<car_image>
					<car_model>
					<car_type>
					<speed>
					<price>


	<div class="footer">

	<script src="js/libraries/API.js">
	<script src="js/libraries/model.js">
	<script src="js/libraries/user input.js">
	<script src="js/search-controller.js">
	<script src="js/cars-controller.js">
	<script src="js/cart-controller.js">