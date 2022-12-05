/* eslint-disable camelcase */

const recipeModel = require('../model/recipe.model')
const { success, failed } = require('../helper/response')
const cloudinary = require('../helper/cloudinary')
const createError = require('http-errors')

const recipeController = {
  listAll: (req, res) => {
    recipeModel.AllRecipe()
      .then((result) => {
        res.json(result)
      }).catch((err) => {
        res.json(err)
      })
  },
  list: (req, res) => {
    const sort = req.query.sort
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 3
    const offset = (page - 1) * limit
    recipeModel.selectAll(sort, limit, offset)
      .then((result) => {
        res.json(result)
      }).catch((err) => {
        res.json(err)
      })
  },
  listSearch: (req, res) => {
    const title = req.params.title
    const sort = req.query.sort
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 3
    const offset = (page - 1) * limit
    recipeModel.selectbysearch(title, sort, limit, offset)
      .then((result) => {
        success(res, result, 'success', ' success get recipe')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'failed get error')
      })
  },
  detail: (req, res) => {
    const id = req.params.id
    recipeModel.selectDetail(id).then((result) => {
      res.json(result.rows)
    }).catch((err) => {
      res.json(err)
    })
  },

  detailTitle: (req, res) => {
    const title = req.params.title
    recipeModel.selectDetailTitle(title).then((result) => {
      res.json(result.rows)
    }).catch((err) => {
      res.json(err)
    })
  },

  search: async (req, res) => {
    const title = req.params.title
    const getRecipes = await recipeModel.selectSearch(title)
    try {
      res.json(getRecipes.rows)
    } catch (err) {
      res.json(err)
    }
  },

  // insert: (req, res) => {
  //   const { title, ingredients, photo, video, created_at } = req.body
  //   recipeModel.store(title, ingredients, photo, video, created_at).then((result) => {
  //     res.json(result)
  //   }).catch((err) => {
  //     res.json(err)
  //   })
  // },

  // insert photo
  insert: async (req, res) => {
    try {
      // image
      const photo = await cloudinary.uploader.upload(req.file.path)
      // tangkap data dari body
      const { title, ingredients } = req.body

      const data = {
        title,
        ingredients,
        photo,
        photo_pub_id: photo.public_id,
        photo_url: photo.url,
        photo_secure_url: photo.secure_url
      }
      recipeModel.store(data).then((result) => {
        success(res, data, result, 'success', ' success add recipe')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'failed add recipe')
      })
    } catch (err) {
      failed(res, err.message, 'failed', 'internal server error')
    }
  },

  // insert: (req, res) => {
  //   try {
  //     // image
  //     const photo = req.files.filename
  //     // tangkap data dari body
  //     const { title, ingredients, video, created_at } = req.body

  //     const data = {
  //       title, ingredients, photo, video, created_at
  //     }

  //     recipeModel.insert(data).then((result) => {
  //       success(res, result, 'success', 'upload recipe success')
  //     }).catch((err) => {
  //       failed(res, err.message, 'failed', 'upload recipe failed')
  //     })
  //   } catch (err) {
  //     failed(res, err.message, 'failed', 'internal server error')
  //   }
  // },

  update: async (req, res) => {
    console.log('update recipe')
    const id = req.params.id
    const { title, ingredients, video } = req.body
    let photo
    if (req.file) {
      photo = await cloudinary.uploader.upload(req.file.path)
    }
    console.log(photo)
    const data = {
      title,
      ingredients,
      photo,
      video,
      photo_pub_id: photo.public_id,
      photo_url: photo.url,
      photo_secure_url: photo.secure_url,
      id: parseInt(id)
    }
    console.log(data.id)
    recipeModel.update(data)
      .then((result) => {
        success(res, data, result, 'success', ' success add recipe')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'failed add recipe')
        console.log(data)
      })
  },
  update2: async (req, res) => {
    const { title, ingredients, photo } = req.body
    const id = req.params.id
    const data = {
      title,
      ingredients,
      photo,
      id: parseInt(id)
    }
    recipeModel.update2(data)
      .then((result) => {
        success(res, data, result, 'success', ' success add recipe')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'failed add recipe')
      })
  },
  destroy: (req, res) => {
    const { id } = req.params
    recipeModel
      .destroy(id)
      .then((result) => {
        res.json({
          message: 'success delete data',
          data: result
        })
      }).catch((err) => {
        res.json(err)
      })
  },
  removeRecipe: async (req, res, next) => {
    try {
      const { id } = req.params
      const data = await recipeModel.selectDetail(id)
      const public_id = data.rows[0].photo_pub_id
      console.log(public_id)
      if (public_id !== null) {
        await cloudinary.uploader.destroy(public_id)
      }
      const title = data.rows[0].title

      await recipeModel.destroy(id)

      success(res, data.rows[0], 'success', `${title} deleted`)
    } catch (error) {
      console.log(error)
      next(new createError.InternalServerError())
    }
  }
}

module.exports = recipeController
