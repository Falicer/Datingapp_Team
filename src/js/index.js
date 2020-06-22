import chat from "./modules/chat"
import "../scss/main.scss"

const giphySection = document.querySelector(".giphy-section")
let giphySectionToggle, giphiesContainer, giphySearchInput, giphySearchButton

if (giphySection) {
  giphySectionToggle = giphySection.querySelector(".giphy-section__toggle")
  giphiesContainer = giphySection.querySelector(".giphy-section__giphies")
  giphySearchInput = giphySection.querySelector(".search__input")
  giphySearchButton = giphySection.querySelector(".search__button")
}

function getTrendingGiphies() {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const result = await fetch("/api/giphies/trending")
        const giphies = await result.json()

        resolve(giphies)
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function getSearchedGiphies(query = "weed") {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        const result = await fetch(`/api/giphies/search?query=${query}`)
        const giphies = await result.json()

        resolve(giphies)
      } catch (error) {
        reject(error)
      }
    })()
  })
}

function createGiphyBlock(src, alt) {
  const container = document.createElement("DIV")
  const img = document.createElement("IMG")

  container.className = "giphy-block"

  img.src = src
  img.alt = alt

  container.appendChild(img)

  return container
}

function displayGiphies(giphies) {
  giphies.forEach(({ src, alt }) => {
    const giphyBlock = createGiphyBlock(src, alt)

    giphiesContainer.appendChild(giphyBlock)
  })
}

function updateGiphies(giphies) {
  const $giphies = giphiesContainer.querySelectorAll(".giphy-block")

  const iterations = Math.max(giphies.length, $giphies.length)

  for (let i = 0; i < iterations; i++) {
    const giphyObject = i >= giphies.length ? undefined : giphies[i]
    const giphyBlock = $giphies[i] || undefined

    if (giphyObject != undefined && giphyBlock != undefined) {
      const img = giphyBlock.querySelector("img")

      img.src = giphyObject.src
    } else if (giphyObject == undefined) {
      giphyBlock.remove()
    } else if (giphyBlock == undefined) {
      const newGiphyBlock = createGiphyBlock(giphyObject.src, giphyObject.alt)

      giphiesContainer.appendChild(newGiphyBlock)
    }
  }

  giphies.forEach((giphy, index) => {
    const img = $giphies[index].querySelector("img")

    img.src = giphy.src
  })
}

function toggleSection(element) {
  element.classList.toggle("disabled")

  return !element.classList.contains("disabled")
}

function containsGiphies() {
  return giphiesContainer.querySelector(".giphy-block").length > 0
}

giphySearchButton.addEventListener("click", async () => {
  const query = giphySearchInput.value || undefined

  try {
    const giphies = await getSearchedGiphies(query)

    if (containsGiphies) return updateGiphies(giphies)

    displayGiphies(giphies)
  } catch (error) {
    console.log(error)
  }
})

giphySectionToggle.addEventListener("click", async () => {
  try {
    const isEnabled = toggleSection(giphySection)

    if (isEnabled) {
      const giphies = await getTrendingGiphies()

      console.log("hoi")
      displayGiphies(giphies)
    }
  } catch (error) {
    console.log(error)
  }
})
