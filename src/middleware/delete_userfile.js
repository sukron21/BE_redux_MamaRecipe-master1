const fs = require('fs')
const userModel = require('../model/user.model')

const remove = async (req, res, next) => {
  const id = req.params.id
  const data = await userModel.selectDetail(id)
  if (data.rows[0].photo) {
    const file = data.rows[0].photo
    fs.unlink(`./public/${file}`, (err) => {
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
