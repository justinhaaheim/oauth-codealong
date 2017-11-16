const passport = require("passport")
const router = require("express").Router()

router.get("/login", (req, res, next) => {
  res.render("login")
})

// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/success",
//   failureRedirect: "/login",
// }))

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/login")
  })
})

// router.get("/signup", (req, res, next) => {
//   res.render("signup")
// })
//
// router.post("/signup", passport.authenticate("local-register", {
//   successRedirect: "/success",
//   failureRedirect: "/signup",
// }))

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }))

router.get('/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/success',
    failureRedirect: '/login'
  }))

module.exports = router
