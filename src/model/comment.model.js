/* eslint-disable camelcase */

const db = require('../config/db')

const commentModel = {
  // router list = liat is data di tb
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tb_comments', (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  // router insert
  store: (id_user, id_recipe, comment, created_at) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO tb_comments (id_user, id_recipe, comment, created_at) VALUES (${id_user}, ${id_recipe}, '${comment}', '${created_at}')`,
        (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
    })
  },

  // delete by id
  destroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM tb_comments WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
}

module.exports = commentModel
