const axios = require("axios")

function getTrending() {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}`

  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const result = await axios.get(url)

        if (result.statusText == "OK") return resolve(result.data)

        reject(result)
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function searchGiphy(query) {
  const url = `api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}`

  return new Promise((resolve, reject) => {
    void (async function () {})()
  })
}

module.exports = { getTrending, searchGiphy }
