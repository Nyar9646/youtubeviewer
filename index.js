/**
 * express を利用した環境構築. express's entry point
 */

const path = require('path')
const express = require('express')
const app = express()
const router = express.Router()

/** port:3000 で待ち受け */
const server = app.listen(3000, function () {
  console.log(`Node.js is listening to PORT : ${server.address().port}`)
})

router.use(express.static('public'))

router.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.use('/', router)
