var user_form={
	get_not_authenticated_user_element: function(){ return document.querySelector('.not_authenticated_user') },
	get_authenticated_user_element:     function(){ return document.querySelector('.authenticated_user') },
	get_login:                          function(){ return document.querySelector('.login') },
	get_password:                       function(){ return document.querySelector('.password') }
}


function register()
{
	var user_data={
		login:    user_form.get_login().value,
		password: user_form.get_password().value
	}

	send('add_administrator', encodeURI(JSON.stringify(user_data)), function(status)
	{
		alert(status)
		status = JSON.parse(status)

		authenticate()
	})
}


function login()
{
	var user_data={
		login:    user_form.get_login().value,
		password: user_form.get_password().value
	}

	send('login', encodeURI(JSON.stringify(user_data)), function(status)
	{
		alert(status)
		status = JSON.parse(status)

		authenticate()
	})
}


function authenticate()
{
	get('get_user', function(data)
	{
		data = JSON.parse(data)

		if(data.status)
		{/*
			user_form.get_not_authenticated_user_element().style.display = 'block'
			user_form.get_authenticated_user_element().style.display = 'none'*/
			return
		}
/*
		if(data.role == 'admin')
			window.location = 'a.html'
*/
/*
		user_form.get_not_authenticated_user_element().style.display = 'none'
		user_form.get_authenticated_user_element().style.display = 'block'
*/
/*
		var JSON_user = {
			username: data.name
		}
*/
		show_viewer('menu')

		//add_JSON_to_HTML('.authenticated_user user', JSON_user)
	})
}


function logout()
{
	get('logout', function(data)
	{
		data = JSON.parse(data)

		authenticate()

		if(data.status == 'Ok')
			show_viewer('user')
		else
			alert(data.status)
	})
}