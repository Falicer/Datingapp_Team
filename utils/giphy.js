const axios = require("axios")

function getGiphies(url) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const result = await axios.get(url)

        if (result.statusText != "OK") return reject(result)

        const giphies = result.data.data.map((giphy) => ({
          alt: giphy.title,
          src: giphy.images.original.url,
          id: giphy.id,
        }))

        resolve(giphies)
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function getTrending() {
  return new Promise((resolve, reject) => {
    void (async function (url) {
      try {
        const giphies = await getGiphies(url)

        resolve(giphies)
      } catch (error) {
        reject(error)
      }
    })(
      `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}`
    )
  })
}

function searchGiphy(query) {
  return new Promise((resolve, reject) => {
    void (async function (url) {
      try {
        const giphies = await getGiphies(url)

        resolve(giphies)
      } catch (error) {
        reject(error)
      }
    })(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}`
    )
  })
}

module.exports = { getTrending, searchGiphy }
