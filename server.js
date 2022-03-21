/* server.js - Express server*/
'use strict';
const log = console.log
log('Express server')

const express = require('express')
const app = express();

const path = require('path');
app.use('/public', express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
	res.send('<h1>Root</h1>')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})