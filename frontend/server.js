const express = require('express')
const serveStatic = require('express')
const path = require('express')

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 8080

app.listen(port)

console.log('listening on port:' + port)