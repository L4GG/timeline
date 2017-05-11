import Case from 'case'
import moment from 'moment'

export default class Slide {
	constructor(startDate, content, media, tags = [], background = {color: null, url: null}) {
		// this.start_date = startDate
		this.text = content
		this.media = media
		this.tags = tags
		this.background = background
		// this.unique_id = startDate && content ? Case.kebab(`${startDate.year}-${content.headline}`) : null
		
		// Fields needed for vis.js items
		// http://visjs.org/docs/timeline/
		// this.id = `${startDate.year()}-${eventKey}`
		// this.start = moment.utc(startDate, 'YYYY-MM-DD HH:mm')
		// this.title = title
	}
}
