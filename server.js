require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const postsRoutes = require('./routes/posts')
// const db = require('./db')
require('./passport')
require('hjs')
// require('ejs')

const port = process.env.PORT || 3000

const app = express()

app.set('view engine', 'hjs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  secret: process.env.SESSION_SECRET || 'oauth is cool',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(authRoutes)
app.use(postsRoutes)

// Useful for debugging the session
app.get('/', (req, res, next) => {
  res.send({
    session: req.session,
    user: req.user,
    authenticated: req.isAuthenticated(),
  })
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
