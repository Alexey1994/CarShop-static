var HTML_tags={'body':    true,
               'div':     true,
               'span':    true,
               'br':      true,
               'tr':      true,
               'td':      true,
               'input':   true,
               'button':  true,
               'object':  true,
               'array':   true,
               'element': true}


function update_arrays(element)
{
	var arrays=element.getElementsByTagName('array')

	crawl(arrays, function(array)
	{
		array.array_structure='<element>'+array.innerHTML+'</element>'
	})
}


function crawl(array, func)
{
	if(array)
	for(var i=0; i<array.length; i++)
		if(func(array[i]))
			break
}


function find_model(model_name)
{
	return document.querySelector('model[name="' + model_name + '"]')
}


function find_object(object_name, model)
{
	var current_object=undefined

	if(model)
	crawl(model.childNodes, function(object)
	{
		if(object.getAttribute && object.getAttribute('name')==object_name)
		{
			current_object=object
			return true
		}
	})

	return current_object
}


function set_model(model_name, model_data)
{
	var current_model=find_model(model_name)

	if(!current_model)
		return

	if(!current_model.is_initialized)
		current_model.pattern = current_model.innerHTML

	current_model.innerHTML = current_model.pattern
	update_arrays(current_model)

	current_model.is_initialized = true


	function set_array(array, array_data)
	{
		if(!array)
			return

		array.innerHTML=''

		for(var i=0; i<array_data.length; i++)
			array.innerHTML+=array.array_structure

		update_arrays(array)

		for(var i=0, j=0; i<array_data.length && j<array.childNodes.length; j++)
		{
			var current_object=array.childNodes[j]

			if(!current_object.localName)
				continue

			if(typeof array_data[i]=='object')
			{
				if(array_data[i][0])
					set_array(current_object, array_data[i])
				else
					set_object(current_object, array_data[i])
			}
			else
				current_object.innerHTML=array_data[i]

			i++
		}
	}

	function set_object(object, object_data)
	{
		for(var i in object_data)
		{
			if(object_data[i] && typeof object_data[i]=='object')
			{
				if(i==0)
					set_array(find_object(undefined, object), object_data)

				else if(object_data[i] && object_data[i][0])
					set_array(find_object(i, object), object_data[i])
				else
					set_object(find_object(i, object), object_data[i])
			}	

			var current_attribute=undefined

			if(object)
				crawl(object.childNodes, function(model_attribute)
				{
					if(model_attribute.localName==i)
					{
						current_attribute=model_attribute
						return true
					}
				})

			if(current_attribute)
				current_attribute.innerHTML=object_data[i]
		}
	}

	if(!model_data)
		return

	if(model_data[0] && typeof model_data[0]!='object')
	{
		var arrays = current_model.getElementsByTagName('array')
		set_array(arrays[0], model_data)
	}
	else
		set_object(current_model, model_data)
}


function get_model(model_name)
{
	var current_model=find_model(model_name)

	if(!current_model)
	{
		console.log("модель "+model_name+" не найдена")
		return
	}

	var model={}

	crawl(current_model.childNodes, function(model_attribute)
	{
		if(model_attribute.localName && !HTML_tags[model_attribute.localName])
			model[model_attribute.localName]=model_attribute.innerHTML
	})

	return model
}

update_arrays(document)