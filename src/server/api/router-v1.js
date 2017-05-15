const express = require('express')
const events = require('../../../dist/events.json')

const router = express.Router()

router.get('/events', (req, res) => res.json(events))

module.exports = router
