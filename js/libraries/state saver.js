var state = {}


function add_state(key, value)
{
	var hash = ''

	state[key] = value

	for(var i in state)
		hash += i + ':' + state[i] + ';'

	window.location.hash = hash
}


function refresh_state()
{
	var text = window.location.hash
	var i    = 1
	var key
	var value

	state = {}

	while(i<text.length)
	{
		key = ''
		value = ''

		while(i<text.length && text[i] != ':')
		{
			key += text[i]
			i++
		}

		i++

		while(i<text.length && text[i] != ';')
		{
			value += text[i]
			i++
		}

		i++

		state[key] = value
	}
}
