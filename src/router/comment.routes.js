const express = require('express')
const { list, insert, destroy } = require('../controller/comment.controller')
const router = express.Router()

router
  .get('/comment/', list)
  .post('/comment/', insert)
  .delete('/comment/:id', destroy)

module.exports = router
