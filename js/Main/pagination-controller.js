function set_pages_count(pages_count, start_page)
{
	var pages = []

	if(start_page > 4)
		start_page -= 4
	else
		start_page = 1

	for(var i=0; i<=pages_count && i<9; i++)
		pages.push({
			span:{
				'element': i + start_page,
				
				attributes:{
					class:   (i + start_page == state.current_page) ? 'selected-page' : '',
					onclick: "add_state('current_page', this.querySelector('element').innerHTML); search()"
				}
			}
		})

	if(pages_count > 9)
	{
		pages.push({
			div: {
				text: "всего " + pages_count + " страниц",
				attributes:{
					class: 'count'
				}
			}
		})
	}

	add_JSON_to_HTML('pages', pages)
}