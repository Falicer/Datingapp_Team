const backgroundMap = {
  "background-1": ["/login", "/register"],
  "background-2": ["/", "/user", "*"],
}

function useBackgroundImages(req, res, next) {
  if (req.method == "POST") return next()

  const urlPath = req.originalUrl
  const [urlBase] = new RegExp(/^\/[^\/]*/).exec(urlPath)

  const backgroundMapEntires = Object.entries(backgroundMap)

  const backgroundClass = backgroundMapEntires.find((entry) =>
    entry[1].includes(urlBase)
  )

  if (backgroundClass == undefined) {
    const [_default] =
      backgroundMapEntires.find((entry) => entry[1].includes("*")) || []

    res.locals.bodyStyling = {
      backgroundClass: _default,
    }
    return next()
  }

  res.locals.bodyStyling = {
    backgroundClass: backgroundClass[0],
  }

  next()
}

module.exports = { useBackgroundImages }
