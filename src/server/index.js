const express = require('express')
const hbs = require('express-hbs')
const apiRouter = require('./api/router-v1')
const staticRouter = require('./static-client')

const app = express()
const port = process.env.PORT ? process.env.PORT : 3000

app.engine('hbs', hbs.express4({
	partialsDir: __dirname + '/static-client/views/partials'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/static-client/views')

app.use('/api/v1', apiRouter)
app.use('/static', staticRouter)
app.use(express.static('./dist'))

app.listen(port, function () {
	console.info(`Server listening on port ${port}`)
})
