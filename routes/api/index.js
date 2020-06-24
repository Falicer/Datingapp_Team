const express = require("express")
const router = express.Router()

// Utils
const { getTrending, searchGiphy } = require("../../utils/giphy")

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

router.get("/giphies/trending", async (req, res) => {
  try {
    const giphies = await getTrending()

    res.status(200).json(giphies)
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
})

router.get("/giphies/search", async (req, res) => {
  const query = req.query.query

  try {
    const giphies = await searchGiphy(query)

    res.status(200).json(giphies)
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router
