# FIX_BE_MamaRecipe
 
## About The Project

This is a Restful API repository for Koleksi Resep. This Restful API is built using ExpressJS and PostgreSQL.

### Technology Used

- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Postman](https://www.postman.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Getting Started

### Installation

- Clone this project with `git clone 
- https://github.com/sukron21/excercise
- Install package required with `npm install`
- Setting .env

```bash
# database
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=

# jwt
JWT_SECRET=



```

### Executing program

- Run program with  `npm  start` for production




### /user

- GET | `/user`
  - Body: None
  -  - limit (number | default 3)
    - page (number | default 1)
  - Desc: Get a list of users ascending with username  in the database
- GET | `/user/:id`
  - Body: None
  - Token: Required
  - Desc: Get detailed user data based on the entered id
- PUT | `/user/
  - Body:
    - username (required | alphabet | max 50)
    - phone (required | number | max 13)
  - Desc: Update user data based on entered id
- POST | `/auth/login`
  - Body:
    - email (required | valid email)
    - password (required)
  - Token: Not required
  - Desc: Login
- DELETE | `/user/:id`
  - Body: None
  - Desc: Delete user data based on the entered id

### /recipe

- GET | `/recipes`
  - Body: None
  - Desc: Get all recipe data
- GET | `/recipes/:id`
  - Body: None
  - Token: Required
  - Desc: Get recipe data details based on the entered id
 - GET | `/nama/:nama_recipe
  - Body: None
  - Token: Required
  - Desc: Get recipe data details based on the entered name
- POST | `/recipe`
  - Body:
    - nama_recipe (required | alphabet & number | max 50)
    - ingredients (required)
    - image
  - Desc: Add new recipe data to database
- PUT | `/recipe/:id`
  - Body:
    - name_recipe (required | alphabet & number | max 50)
    - ingredients (required)
    - image
  - Desc: Update recipe data based on entered id
- DELETE | `/recipe/:id`
  - Body: None
  - Token: Required
  - Desc: Delete recipe data based on the entered id

### /comment

- GET | `/comment`
  - Body: None
  - Desc: Get all comment data
- GET | `/comment/:id`
  - Body: None
  - Desc: Get comment data details based on the entered id
- POST | `/comment`
  - Body:
    - commentText (required | max 500)
    - recipeId (required)
    - user_id (required)
  - Token: Required
  - Desc: Add new comment data to database
- PUT | `/comment/:id`
  - Body:
    - commentText (required | max 500)
    - id_user
    - id_recipe
  - Desc: Update comment data based on entered id
- DELETE | `/comment/:id`
  - Body: None
  - Token: Required
  - Desc: Delete comment data based on the entered id


## Authors

Contributors names and contact info:

1. Rahmat Furqon

- [Linkedin](www.linkedin.com/in/furqon-rahmat)
