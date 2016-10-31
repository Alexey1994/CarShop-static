<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>
		<link rel="stylesheet" href="css/bootstrap.css">
		<link rel="stylesheet" href="css/reset.css">
		<link rel="stylesheet" href="css/header.css">
		<link rel="stylesheet" href="css/content.css">
		<link rel="stylesheet" href="css/footer.css">

	<body>

	<div class="header">

	<div class="content">
		<div class="search-menu">
			<div class="search-panel">

				<div class="type-car">
					Марка автомобиля:
					<select id="search_parameter_model">
						<option>Любая
						<option>Acura
						<option>Alfa Romeo
						<option>Audi
						<option>BMW
						<option>Chery
						<option>Chevrolet

				<div class="type-car">
					Тип автомобиля:
					<select id="search_parameter_type">
						<option>Любой

				<input type="text" class="price" placeholder="цена от" id="search_parameter_price_begin">
				<input type="text" class="price" placeholder="цена до" id="search_parameter_price_end">

				<button class="search-button">Подобрать

	<div class="footer">

	<script src="js/search-controller.js">