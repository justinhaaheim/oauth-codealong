/* eslint-disable */
// const bcrypt = require("bcrypt-nodejs")
const db = require("./db")
const passport = require("passport")
// const LocalStrategy = require("passport-local").Strategy
const GitHubStrategy = require("passport-github").Strategy

// passport.use(new LocalStrategy(authenticate))
// passport.use("local-register", new LocalStrategy({passReqToCallback: true}, register))

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('GitHub Profile: ', profile)
    db.getOauthUser('github', profile.username)
      .then((user) => {
        if (user) {
          return done(null, user)
        }
        const newUser = {
          oauth_provider: 'github',
          oauth_id: profile.username
        }

        return db.createOauthUser(newUser)
          .then((createdUser) => {
            done(null, createdUser) // contains database id
          })
      })
      .catch((err) => {
        console.log("OAuth Error: ", err)
        done(err, null)
      })
  }
))


passport.serializeUser(function(user, done) {
  console.log("serialize - user object:", user)
  console.log('')
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  db.getUserById(id)
    .then((user) => {
      done(null, user)
    }, done)
})
