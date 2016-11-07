function get_input(name, run_on_load)
{
	var elements       = document.getElementsByTagName('user_input')
	var result_element = undefined
	var result_object  = {}
	var element        = undefined
	var is_loaded      = []

	for(var i in elements)
		if(elements[i].getAttribute && elements[i].getAttribute('name')==name)
		{
			element=elements[i]
			break
		}

	if(!element)
		return undefined

	function get_all_child_nodes(element)
	{
		function add_inner_input(element)
		{
			function is_empty_element(element)
			{
				if(element.childNodes.length>1)
					return false

				if(element.childNodes[0].innerHTML)
					return false

				return true
			}


			if(element.childNodes.length>0 && !is_empty_element(element))
				return

			var input=document.createElement('input')
			element.appendChild(input)

			var attribute=element.getAttribute('placeholder')

			if(!attribute)
				attribute=key
					
			input.setAttribute('placeholder', attribute)
			input.setAttribute('type', element.getAttribute('type'))
		}


		function add_inner_select(element)
		{
			var select=document.createElement('select')
			select.innerHTML = element.innerHTML
			element.innerHTML = ''
			element.appendChild(select)

			select.onchange = element.onchange
			element.onchange = null
		}


		var child_nodes=element.childNodes

		if(child_nodes && element.innerHTML!=undefined)
		{
			switch(element.getAttribute('type'))
			{
				case 'text':
				case 'password':
					if(!element.is_initialized)
					{
						add_inner_input(element)
						
					}

					var key=element.tagName.toLowerCase()
					var input = element.querySelector('input')

					result_object[key] = input.value

					if(run_on_load)
						run_on_load(result_object)

					element.is_initialized = 1
					break

				case 'select':
					if(!element.is_initialized)
						add_inner_select(element)

					var key=element.tagName.toLowerCase()
					var select = element.querySelector('select')

					result_object[key] = select.value

					element.is_initialized = 1
					break

				case 'file':
					add_inner_input(element)
					var key=element.tagName.toLowerCase()
					var input

					if(element.childNodes[0].innerHTML)
						input=element.childNodes[0]
					else
						input=element.childNodes[1]

					input.setAttribute('type', element.getAttribute('type'))

					if(!run_on_load)
					{
						console.log('асинхронный запрос не может быть выполнен')
						return
					}

					if(!input.files[0])
						return

					is_loaded.push('')

					load_file(input, function(data, file_params)
					{
						var file={
							data:   data,
							params: file_params
						}

						result_object[key] = file
						is_loaded.pop()
					})

					element.is_initialized = 1
					break

				default:
					for(var i in child_nodes)
						get_all_child_nodes(child_nodes[i])
			}
		}
	}


	get_all_child_nodes(element)

	if(run_on_load)
	var load_files_thread = setInterval(function()
	{
		if(!is_loaded.length)
		{
			run_on_load(result_object)
			clearInterval(load_files_thread)
		}
	}, 15)

	return result_object
}