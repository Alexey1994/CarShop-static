<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>#title
		<link rel="stylesheet" href="css/style.css">

	<body>

	<div class="header">
		<div class="language-buttons">
			<button onclick="update_page('RU')">Русский
			<button onclick="update_page('EN')">English

		<div class="user">
			<input type="text" placeholder="#login" class="login">
			<input type="password" placeholder="#password" class="password">
			<button class="login">#sign_out
			<button class="login">#sign_in

	<div class="content">
		<div class="search-menu">
			<div class="search-panel">
				<model name="car_element" class="search-car-element">
					<array>
						<type_car>
						<model_car>
						<del onclick="delete_car_criteria(this)">

				<user_input name="car_parameters">

					#model_car:
					<type_car type="select" class="type-car" onchange="get_car_types()">
						<option>Любая
						<option>Acura
						<option>Alfa Romeo
						<option>Audi
						<option>BMW
						<option>Chery
						<option>Chevrolet

					#type_car:
					<model_car type="select" class="type-car" id="select_car_type">
						<option>Любой

					<button onclick="add_car_criteria()" class="add-car-criteria">Добавить автомобиль

					<price_begin type="text" placeholder="#price_from" class="price" oninput="validate_price_begin()">
					<price_end type="text" placeholder="#price_to" class="price">

				<button class="search-button" onclick="search()">#find
				<button class="search-button" onclick="set_new_car()">Новый автомобиль

		<div class="new-car-wrapper">
			<div class="new-car">
				<user_input name="new_car">
					Модель:
					<model_car type="text" placeholder="Модель">
					Тип:
					<type_car type="text" placeholder="Тип">
					Цвет:
					<type_car type="text" placeholder="Цвет">

				<button onclick="save_new_car()" class="add">Сохранить
				<button onclick="cancel_save_new_car()" class="cancel">Отмена

		<div class="cars">
			<div class="search-order">
				<button class="type" parameter="model">Модель
				<button class="type" parameter="type">Тип
				<button class="type" parameter="price">Цена
				<button class="order" onclick="set_order(this)">&darr;

			<model name="cars">
				<array>
					<div class="descriptions">
						<div class="model-description">
							#model:
						<div class="type-description">
							#type:
						<div class="speed-desription">
							#maximum_speed:
						<div class="price-desription">
							#price:
					<car_image>
					<car_model>
					<car_type>
					<speed>
					<price>
					<button class="del">Удалить
					<button class="edit">Редактировать

			<div class="pages">
				<model name="page_navigation">
					<array>


	<div class="footer">

	<script src="js/libraries/API.js">
	<script src="js/libraries/model.js">
	<script src="js/libraries/user input.js">
	<script src="js/libraries/localizator.js">
	<script src="js/libraries/state saver.js">

	<script src="js/Admin/cars-controller.js">
	<script src="js/Admin/search-controller.js">
	<script src="js/Admin/main.js">