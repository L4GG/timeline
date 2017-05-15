const express = require('express')
const events = require('../../../dist/events.json')

const router = express.Router()

router.get('/', (req, res) => {
	res.render('events', {events})
})

module.exports = router
