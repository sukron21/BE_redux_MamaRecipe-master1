# FIX_BE_MamaRecipe
 
## About The Project

This is a Restful API repository for collection recipe. This Restful API is built using ExpressJS and PostgreSQL.

### Technology Used

- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Postman](https://www.postman.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Getting Started


### Structure Folder 

<p id='structure-folder'>Backend</p>
<ul>
  <li>photofood || <span><b><i>Folder for save recipe image in local storage</i></b></span></li>
  <li>public || <span><b><i>Folder for save user image in local storage</i></b></span></li>
  <li>src</li>
  <ul>
  <li>config ||<span><b><i>Folder for database setting to connect with backend.</i></b></span></li>
    <li>controller ||<span><b><i>You can store various needs for this website, such as images, styles, javascript, and others.</i></b></span></li>
    <li>helper ||<span><b><i>This folder to help the user such as for example response.</i></b></span></li>
    <li>Middlware ||<span><b><i>This folder is to help users deal with things related to jwtauth cloudinary and multer.</i></b></span></li>
    <li>model ||<span><b><i>In this folder we use a query so that user input enters the database.</i></b></span></li>
    <li>router ||<span><b><i>The router is used to set the endpoint of this application.</i></b></span></li>
  </ul>
</ul>
<a href='#table-of-content'>Back to top</a>
<hr/>

### Installation Guide 

<p id='installation-guide'>Backend</p>
- Clone this project with `git clone : https://github.com/sukron21/excercise
- Install package required with `npm install`
<ol type="1">
  <li>Your first step is to add the .env settings contained in the backend folder, with the examples contained in the .env-example or

### database
<p>DB_HOST=</p>
<p>DB_USER=</p>
<p>DB_PASSWORD=</p>
<p>DB_NAME=</p>
<p>DB_PORT=</p>
<p>PORT=</p>

### jwt
<li>JWT_SECRET=.</li>

  <li>Continue with database creation.</li>
  <li>You can first import the postman documentation contained in this repo and pay attention to the fields in each POST request.
</li>
  <li>To run the server that has been set, use the <b>npm run dev command</b>.</li>
  <li>When there is a description of the Server running on Port (with the port you have specified), the API is ready to use.</li>
</ol>
<hr />
### Package
check in file package.json
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

- GET | `/recipe`
  - Body: None
  - Desc: Get all recipe data
- GET | `/recipe/:id`
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
