const userModel = require('../model/user.model')
const { success, failed, successWithToken } = require('../helper/response')

const bcyrpt = require('bcrypt')
const jwtToken = require('../helper/generateJWT')
module.exports = {
  register: (req, res) => {
    try {
      // image
      // const photo = req.file.filename
      // tangkap data dari body
      const { username, email, password, phone } = req.body
      bcyrpt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, err.message, 'failed', 'fail hash password')
        }
        // console.log(hash)
        const data = {
          username, email, password: hash, phone, level: 1
        }
        userModel.register(data).then((result) => {
          success(res, result, 'success', 'register success')
        }).catch((err) => {
          failed(res, err.message, 'failed', 'register failed')
        })
      })
    } catch (err) {
      failed(res, err.message, 'failed', 'internal server error')
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body
    userModel.checkUsername(email).then((result) => {
      // console.log(res)
      const user = result.rows[0]
      if (result.rowCount > 0) {
        bcyrpt.compare(password, result.rows[0].password).then(async (result) => {
          if (result) {
            const token = await jwtToken({
              email: user.email,
              level: user.level
            })
            successWithToken(res, { token, data: user }, 'success', 'login success')
          } else {
            // ketika password salah
            failed(res, null, 'failed', 'password and username wrong')
          }
        })
      } else {
        // ketika username salah
        failed(res, null, 'failed', 'password and username wrong')
      }
    }).catch((err) => {
      failed(res, err.message, 'failed', 'internal server error')
    })
  }
}
