import Slide from 'models/Slide'
import EventTemplate from 'utils/EventTemplate'
import Case from 'case'
import {trim, startsWith} from 'lodash'
import moment from 'moment'

export default function(eventKey, eventDirectory) {
	function getContents(file, defaultContents) {
		return eventDirectory[file] ? trim(eventDirectory[file]['src']) : defaultContents
	}

	function getImageUrl(contents) {
		return require(`images/${contents}`)
	}

	function getBackground(file) {
		const contents = getContents(file)
		if (contents) {
			return getImageUrl(contents)
		}
	}

	function getMedia(file) {
		const contents = getContents(file)
		if (!startsWith(contents, 'http') && contents.match(/\.(jpeg|jpg|gif|png)$/)) {
			return getImageUrl(contents)
		} else {
			return contents
		}
	}

	function getTags(file) {
		const contents = getContents(file)
		const tags = contents ? contents.split(',') : []
		return tags.map(Case.constant)
	}

	const startDateString = getContents(EventTemplate.START_DATE)
	const title = getContents(EventTemplate.SLIDE_TITLE)
	const text = getContents(EventTemplate.SLIDE_TEXT)
	const mediaUrl = getMedia(EventTemplate.MEDIA_URL)
	const caption = getContents(EventTemplate.MEDIA_CAPTION)
	const credit = getContents(EventTemplate.MEDIA_CREDIT)
	const tags = getTags(EventTemplate.TAGS)
	const url = getBackground(EventTemplate.BACKGROUND_URL)

	const startDate = moment.utc(startDateString, 'YYYY-MM-DD HH:mm')

	return {
		id: `${startDate.year()}-${eventKey}`,
		group: 'events',
		start: startDate,
		title,
		text,
		mediaUrl,
		caption,
		credit,
		url,
	}
}
