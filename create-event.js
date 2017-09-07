const moment = require('moment')
const mkdirp = require('mkdirp')
const path = require('path')
const Case = require('case')
const fs = require('fs')
const EventTemplate = require('./src/utils/EventTemplate')
const args = JSON.parse(process.env.npm_config_argv)

if (args.remain.length < 2) {
	throw new Error('An event name and date are required. For example: \nnpm run create "Event Name" "2017-02-28 19:30"')
}

const [eventName, eventDateString] = args.remain
const eventDate = moment.utc(eventDateString, 'YYYY-MM-DD HH:mm')

if (!eventDate.isValid()) {
	throw new Error(`"${eventDateString}" is an invalid date. Please pass a date in the format "YYYY-MM-DD HH:mm".`)
}
const eventPath = path.join(process.cwd(), 'src', 'events', String(eventDate.year()), Case.kebab(eventName))
mkdirp(eventPath, err => {
	if (err) {
		throw(err)
	} else {
		generateFile(EventTemplate.SLIDE_TITLE, eventName)
		generateFile(EventTemplate.START_DATE, eventDateString)
		generateFile(EventTemplate.BACKGROUND_URL)
		generateFile(EventTemplate.MEDIA_CAPTION)
		generateFile(EventTemplate.MEDIA_CREDIT)
		generateFile(EventTemplate.MEDIA_URL)
		generateFile(EventTemplate.SLIDE_TEXT)
		generateFile(EventTemplate.TAGS)
	}
})

function generateFile(fileName, content = '') {
	const filePath = path.join(eventPath, fileName)
	fs.stat(filePath, err => {
		if (err) {
			fs.writeFile(filePath, content, undefined, () => console.log(`Created ${filePath}`))
		} else {
			console.log(`${filePath} already exists`)
		}
	})
}
