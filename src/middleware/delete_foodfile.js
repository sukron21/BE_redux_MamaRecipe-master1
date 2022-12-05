const fs = require('fs')
const recipeModel = require('../model/recipe.model')

const remove = async (req, res, next) => {
  const id = req.params.id
  const data = await recipeModel.selectDetail(id)
  if (data.rows[0].photo) {
    const file = data.rows[0].photo
    fs.unlink(`./photofoods/${file}`, (err) => {
      if (err) {
        console.log(err)
        next()
      }
    })
    next()
  } else {
    res.json('Not found image')
  }
}

module.exports = remove
