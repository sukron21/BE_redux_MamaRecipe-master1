
const express = require('express')
const { list, detail, insert, destroy, update, detailTitle, search, listSearch, listAll, update2, removeRecipe } = require('../controller/recipe.controller')

const router = express.Router()

const uploadFoods = require('../middleware/photo_food')
const deleteFoods = require('../middleware/delete_foodfile')

router
  .get('/recipe', list)
  .get('/recipe/all', listAll)
  .get('/recipe/:id', detail)
  .get('/recipe/listsearch/:title', listSearch)
  .post('/recipe/upload', uploadFoods, insert)
  .post('/recipe/:title', detailTitle)
  .get('/recipe/search/:title', search)
  .put('/recipe/photo/:id', uploadFoods, update)
  .put('/recipe/:id', update2)
  .delete('/recipe/:id', deleteFoods, destroy)
  .delete('/recipe/photo/:id', removeRecipe)

module.exports = router
