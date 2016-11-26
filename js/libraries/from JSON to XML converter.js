function get_safe_string(string)
{
	var new_string = ''

	for(var i in string)
		if(string[i] == '<')
			new_string += '&lt;'
		else if(string[i] == '>')
			new_string += '&gt;'
		else
			new_string += string[i]

	return new_string
}


function get_JSON_attributes_in_XML_representation(XML_element, attributes)
{
	for(var i in attributes)
	{
		var attribute = attributes[i]

		if(attribute)
			XML_element.setAttribute(i, attributes[i])
	}
}


function get_JSON_string_in_XML_representation(JSON_string, parrent_element_name)
{
	var XML_element = document.createElement(parrent_element_name)
	XML_element.innerHTML = get_safe_string(JSON_string)
	return XML_element
}


function get_JSON_number_in_XML_representation(JSON_number, parrent_element_name)
{
	var XML_element = document.createElement(parrent_element_name)
	XML_element.innerHTML = JSON_number
	return XML_element
}


function get_JSON_boolean_in_XML_representation(JSON_boolean, parrent_element_name)
{
	var XML_element = document.createElement(parrent_element_name)
	XML_element.innerHTML = JSON_boolean
	return XML_element
}


function get_JSON_object_in_XML_representation(JSON_element, parrent_element_name)
{
	var XML_element = document.createElement(parrent_element_name)
	var inner_XML_element

	if(JSON_element['attributes'])
		get_JSON_attributes_in_XML_representation(XML_element, JSON_element['attributes'])

	for(var i in JSON_element)
	{
		if(i != 'attributes')
		{
			inner_XML_element = get_inner_XML_element(JSON_element[i], i)

			if(inner_XML_element)
				XML_element.appendChild(inner_XML_element)
		}
	}

	return XML_element
}


function get_JSON_array_in_XML_representation(JSON_element, parrent_element_name)
{
	var XML_element = document.createElement(parrent_element_name)
	var inner_XML_element

	if(JSON_element['attributes'])
		get_JSON_attributes_in_XML_representation(XML_element, JSON_element['attributes'])

	for(var i in JSON_element)
	{
		if(i != 'attributes')
		{
			inner_XML_element = get_inner_XML_element(JSON_element[i], 'e')
			XML_element.innerHTML += inner_XML_element.innerHTML
		}
	}

	return XML_element
}


function get_inner_XML_element(JSON_element, element_name)
{
	switch(typeof JSON_element)
	{
		case 'string':  return get_JSON_string_in_XML_representation(JSON_element, element_name)
		case 'number':  return get_JSON_number_in_XML_representation(JSON_element, element_name)
		case 'boolean': return get_JSON_boolean_in_XML_representation(JSON_element, element_name)

		case 'object':
			if(typeof JSON_element[0] == 'undefined')
				return get_JSON_object_in_XML_representation(JSON_element, element_name)
			else
				return get_JSON_array_in_XML_representation(JSON_element, element_name)
	}
}


function convert_from_JSON_to_XML(JSON_data)
{
	if(typeof JSON_data == 'string')
		try {
			JSON_data = JSON.parse(JSON_data)
		} catch(e) {}

	return get_inner_XML_element(JSON_data, 'element')
}


function add_JSON_to_HTML(path, JSON_data)
{
	var HTML_place = document.querySelector(path)
	HTML_place.innerHTML = ''
	HTML_place.appendChild(convert_from_JSON_to_XML( JSON_data ))
}