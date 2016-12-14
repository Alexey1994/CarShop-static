var language
var localizator_body_template = document.body.innerHTML
var localizator_head_template = document.head.innerHTML


function update_localizator_template()
{
	localizator_body_template = document.body.innerHTML
	localizator_head_template = document.head.innerHTML
}


function is_letter(character)
{
	if((character>='a' && character<='z') || character=='_')
		return true
}


function parse_localizator(text, template)
{
	var translated_text = ''
	var i = 0

	while(i<text.length)
	{
		if(text[i] == '#')
		{
			var word = ''

			i++

			while(is_letter(text[i]))
			{
				word += text[i]
				i++
			}

			translated_text += template[word]
		}
		else
		{
			translated_text += text[i]
			i++
		}
	}

	return translated_text
}


function localize(template)
{
	document.body.innerHTML = parse_localizator(localizator_body_template, template)
	document.head.innerHTML = parse_localizator(localizator_head_template, template)
}