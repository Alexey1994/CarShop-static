function get_client_API()
{
  var client_API

  try { client_API = new ActiveXObject("Msxml2.XMLHTTP") } 
  catch (e) 
  {
    try { client_API = new ActiveXObject("Microsoft.XMLHTTP") } 
    catch (E) { client_API = false }
  }

  if (!client_API &&  typeof XMLHttpRequest != 'undefined')
    client_API = new XMLHttpRequest()

  return client_API
}


function get(path, get_func)
{
	var client_API = get_client_API()

	client_API.open('GET', path, true)

	client_API.onreadystatechange = function()
	{
		if(client_API.status!=200)
		{
			console.log('запрос '+path+' не найден в API сервера')
			return
		}

		if(client_API.readyState==4)
			get_func(client_API.responseText)
	}

	client_API.send(null)
}


function sync_get(path)
{
	var client_API = get_client_API()

	client_API.open('GET', path, false)
	client_API.send(null)

	if(client_API.status!=200)
	{
		console.log('файл '+path+' не найден')
		return
	}

	return client_API.responseText
}


function include(path)
{
	var client_API = get_client_API()

	client_API.open('GET', path, false)
	client_API.send(null)

	if(client_API.status!=200)
	{
		console.log('файл '+path+' не найден')
		return
	}

	window.eval(client_API.responseText)
}


function send(path, data, get_func)
{
	var client_API = get_client_API()

	client_API.open('POST', path, true)
	//client_API.setRequestHeader('Content-Type', 'text/plain')

	client_API.onreadystatechange = function()
	{
		if(client_API.readyState==4)
			get_func(client_API.responseText)
	}

	client_API.send(data)
}


function load_file(file, run_on_load)
{
	var reader    = new FileReader()
	var file_parameters = file.files[0]

	if(!file_parameters)
		return false

	reader.onload = function(event)
	{
		run_on_load(event.target.result, file_parameters)
	}

	reader.readAsText(file_parameters)
	//reader.readAsBinaryString(file_parameters)
	//reader.readAsDataURL(file_parameters)
}


function load_file_as_URL(file, run_on_load)
{
	var reader    = new FileReader()
	var file_parameters = file.files[0]

	if(!file_parameters)
		return false

	reader.onload = function(event)
	{
		run_on_load(event.target.result, file_parameters)
	}

	reader.readAsDataURL(file_parameters)
}