/* eslint-disable camelcase */
const commentModel = require('../model/comment.model')

const commentController = {
  list: (req, res) => {
    commentModel.selectAll()
      .then((result) => {
        res.json(result)
      }).catch((err) => {
        res.json(err)
      })
  },
  insert: (req, res) => {
    const { id_user, id_recipe, comment, created_at } = req.body
    commentModel.store(id_user, id_recipe, comment, created_at).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
  },
  destroy: (req, res) => {
    const { id } = req.params
    commentModel.destroy(id).then((result) => {
      res.json({
        message: 'success delete data',
        data: result
      })
    }).catch((err) => {
      res.json(err)
    })
  }
}

module.exports = commentController
