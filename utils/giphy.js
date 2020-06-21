const axios = require("axios")

function getTrending() {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}`

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

function searchGiphy(query) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}`

  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const result = await axios.get(url)
        console.log(result)
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

module.exports = { getTrending, searchGiphy }
