function getTrending() {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}`

  return new Promise((resolve, reject) => {
    void (async function () {})()
  })
}

function searchGiphy(query) {
  const url = `api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}`

  return new Promise((resolve, reject) => {
    void (async function () {})()
  })
}

module.exports = { getTrending, searchGiphy }
