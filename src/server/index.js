const express = require('express')
const apiRouter = require('./api/router-v1')

const app = express()
const port = process.env.PORT ? process.env.PORT : 3000

app.use('/api/v1', apiRouter)
app.use(express.static('./dist'))

app.listen(port, function () {
	console.info(`Server listening on port ${port}`)
})
