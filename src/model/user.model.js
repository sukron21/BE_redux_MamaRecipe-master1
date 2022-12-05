
const db = require('../config/db')

const userModel = {
  // router list
  selectAll: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_users LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  selectAlldata: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tb_users', (err, res) => {
        if (err) {
          reject(err)
          // console.log(err)
        }
        resolve(res)
      })
    })
  },
  // lihat data by id
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_users WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // update
  update: (id, username, email, password, phone, photo, level) => new Promise((resolve, reject) => {
    db.query(`UPDATE tb_users SET username = COALESCE ($1, username), 
    email = COALESCE ($2, email), 
    password = COALESCE ($3, password), 
    phone = COALESCE ($4, phone), 
    photo = COALESCE ($5, photo), 
    level = COALESCE ($6, level) WHERE id = $7`,
    [username, email, password, phone, photo, level, id],
    (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }),

  // router insert
  store: (name, email, password, phone, photo, level) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO tb_users (name, email, password, phone, photo, level) VALUES ('${name}', '${email}', '${password}', '${phone}', '${photo}', ${level})`,
        (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
    })
  },
  // model register
  register: ({ name, email, password, phone }) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO tb_users (name, email, password, phone) VALUES ('${name}', '${email}', '${password}', '${phone}')`,
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
      db.query(`DELETE FROM tb_users WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  // model login
  checkUsername: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_users WHERE email='${email}'`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
}

module.exports = userModel
