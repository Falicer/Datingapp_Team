const setUserVariables = (req, res, next) => {
  if (!req.user) return next()

  res.locals.user = req.user
  res.locals.isNew = req.user.age == undefined

  next()
}

module.exports = {
  setUserVariables,
}
