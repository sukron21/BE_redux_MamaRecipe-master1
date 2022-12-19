const userModel = require('../model/user.model.js')
const { success, failed } = require('../helper/response')

const userController = {
  list: (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    userModel.selectAll(limit, offset)
      .then((result) => {
        success(res, result, 'success', 'get all user success')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'get all user failed')
      })
  },
  detail: (req, res) => {
    const id = req.params.id
    userModel.selectDetail(id).then((result) => {
      res.json(result.rows)
    }).catch((err) => {
      res.json(err)
    })
  },
  all: (req, res) => {
    userModel.selectAlldata()
      .then((result) => {
        success(res, result, 'success', 'get all user success')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'get all user failed')
        console.log(err)
      })
  },
  insert: (req, res) => {
    const { name, email, password, phone, photo, level } = req.body
    // const photo = req.file.filename
    userModel.store(name, email, password, phone, photo, level).then((result) => {
      success(res, null, 'success', 'insert user success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'insert user failed')
    })
  },
  update: (req, res) => {
    const { username, email, password, phone, level } = req.body
    const id = req.params.id
    const photo = req.file.filename
    userModel.update(id, username, email, password, phone, photo, level).then((result) => {
      success(res, null, 'success', 'update user success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'update user failed')
    })
  },
  destroy: (req, res) => {
    const { id } = req.params
    userModel
      .destroy(id)
      .then((result) => {
        res.json({
          message: 'success delete data',
          data: result
        })
      }).catch((err) => {
        res.json(err)
      })
  }
}

module.exports = userController
