import moment from 'moment'
import vis from 'vis'

export default class Timeline {
	constructor(title, eras, events, tags) {
		this._allTags = tags
		this.tags = new Set(this._allTags)

		// Index by id for easy lookup
		this._eventsById = {}
		for (const event of events) {
			this._eventsById[event.id] = event
		}
		
		const allEvents = [...events, ...eras]
		
		const minDate = allEvents.reduce((acc, event) => moment.min(acc, event.start), events[0].start)
		const maxDate = allEvents.reduce((acc, event) => moment.max(acc, event.end || event.start), events[0].end || events[0].start)

		const options = {
			// showCurrentTime: false,
			height: '150px',
			// horizontalScroll: true,
			stack: false,
			type: 'box',
			min: moment(minDate).subtract(1, 'years'),
			max: moment(maxDate).add(1, 'years'),
		}
		
		const groups = [
			{id: 'eras', content: ''},
			{id: 'events', content: ''},
		]

		this._slideContainer = document.getElementById('slide-container')
		this._TL = new vis.Timeline(
			document.getElementById('timeline-container'),
			allEvents,
			groups,
			options,
		)
		this._TL.on('select', ({items, clickEvent}) => {
			for (const id of items) {
				const event = this._eventsById[id]
				if (!event) { continue }

				this._slideContainer.innerHTML = event.text
			}
		})
	}

}
