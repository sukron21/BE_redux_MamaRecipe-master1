/* eslint-disable camelcase */

const db = require('../config/db')

const recipeModel = {
  // router list
  // selectAll: (limit, offset) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM tb_recipes LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
  //       if (err) {
  //         reject(err)
  //       }
  //       resolve(res)
  //     })
  //   })
  // },
  selectAll: (sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_recipes ORDER BY title ${sort} LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  AllRecipe: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tb_recipes', (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  selectbysearch: (title, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_recipes WHERE lower(title) ILIKE lower('%${title}%') ORDER BY title ${sort} LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
        if (err) {
          reject(err)
          console.log(title, sort)
        }
        resolve(res)
      })
    })
  },
  // lihat data by id
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_recipes WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // lihat data by title
  selectDetailTitle: (title) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_recipes WHERE lower(title) ILIKE lower('%${title}%') ORDER BY title ASC`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  // lihat data search by title
  selectSearch: (title) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_recipes WHERE title ILIKE '%${title}%'`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // update
  update: (data) => {
    // console.log(title, ingredients, photo, video, created_at, photo_pub_id, photo_url, photo_secure_url, id)
    console.log('model', data)
    return new Promise((resolve, reject) => {
      db.query(`UPDATE tb_recipes SET 
    title = COALESCE ($1, title), 
    ingredients = COALESCE ($2, ingredients), 
    photo = COALESCE ($3, photo), 
    video = COALESCE ($4, video), 
    created_at = COALESCE ($5, now()),
    photo_pub_id = COALESCE ($6, photo_pub_id),
    photo_url = COALESCE ($7, photo_url),
    photo_secure_url = COALESCE ($8, photo_secure_url)
    WHERE id = $9`,
      [data.title, data.ingredients, data.photo, data.video, data.created_at, data.photo_pub_id, data.photo_url, data.photo_secure_url, data.id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  update2: (data) => {
    // console.log(title, ingredients, photo, video, created_at, photo_pub_id, photo_url, photo_secure_url, id)
    console.log(data)
    return new Promise((resolve, reject) => {
      db.query(`
    UPDATE tb_recipes SET 
    title = COALESCE ($2, title), 
    ingredients = COALESCE ($3, ingredients), 
    photo = COALESCE ($4, photo), 
    created_at = COALESCE ($5, now())
    WHERE id = $1`
      ,
      [`${data.id},${data.title}, ${data.ingredients}, ${data.photo}, ${data.created_at}`], (err, result) => {
        if (err) {
          reject(err)
          // console.log(err)
        } else {
          resolve(result)
        }
      })
    })
  },

  store: ({ title, ingredients, photo, photo_pub_id, photo_url, photo_secure_url }) => {
    console.log(title, ingredients, photo, photo_pub_id, photo_url, photo_secure_url)
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO tb_recipes ( title, ingredients, photo, created_at, photo_pub_id, photo_url, photo_secure_url) VALUES  ('${title}', '${ingredients}', '${photo}', now(), '${photo_pub_id}', '${photo_url}', '${photo_secure_url}')`,
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
      db.query(`DELETE FROM tb_recipes WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
}

module.exports = recipeModel
