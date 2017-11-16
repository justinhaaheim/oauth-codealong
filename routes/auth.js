const passport = require("passport")
const router = require("express").Router()

router.get("/login", (req, res, next) => {
  res.render("login")
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/posts",
  failureRedirect: "/login",
}))

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/login")
  })
})

router.get("/signup", (req, res, next) => {
  res.render("signup")
})

router.post("/signup", passport.authenticate("local-register", {
  successRedirect: "/posts",
  failureRedirect: "/signup",
}))

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }))

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('OAuth login successful!')
    res.redirect('/');
  })

module.exports = router
