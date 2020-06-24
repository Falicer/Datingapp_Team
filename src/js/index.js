import "../scss/main.scss"
//import giphy from "../../utils/giphy"

const giphySection = document.querySelector(".chat-footer__giphies-container")
let giphySectionToggle,
  chatForm,
  giphiesContainer,
  giphySearchInput,
  giphySearchButton,
  sendButton,
  chatInput,
  messageTypeInput,
  messageContentInput

if (giphySection) {
  chatForm = document.querySelector(".chat__form")
  giphySectionToggle = document.querySelector(".chat-footer__controls-giphy")
  giphiesContainer = document.querySelector(".giphy-section__giphies")
  chatInput = document.querySelector(".chat-footer__controls-text")
  sendButton = document.querySelector(".send__input")
  messageTypeInput = document.querySelector("#message-type")
  messageContentInput = document.querySelector("#message-content")

  giphySectionToggle.addEventListener("click", async () => {
    const isHidden = toggleSection(giphySection)

    if (!isHidden) {
      const trendingGiphies = await getTrendingGiphies()
      chatInput.name = ""
      messageContentInput.name = "content"

      messageTypeInput.value = "giphy"
      sendButton.type = "button"

      giphySearchInput = chatInput
      giphySearchButton = sendButton

      sendButton.innerHTML = "<i class='fa fa-search'></i>"

      giphySearchButton.addEventListener("click", async () => {
        const query = giphySearchInput.value

        const giphies = await getSearchedGiphies(query)

        if (containsGiphies) return updateGiphies(giphies)

        displayGiphies(giphies)
      })

      // if (containsGiphies) return updateGiphies(trendingGiphies)

      displayGiphies(trendingGiphies)
    } else {
      chatInput.name = "content"
      messageContentInput.name = ""

      messageTypeInput = "text"
      sendButton.type = "submit"

      sendButton.innerHTML = "<i class='fa fa-paper-plane'></i>"

      giphySearchInput = undefined
      giphySearchButton = undefined
    }
  })
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

    giphyBlock.addEventListener("click", () => {
      const src = giphyBlock.querySelector("img").src

      messageContentInput.value = src

      chatForm.submit()
    })
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
  element.classList.toggle("show")

  return !element.classList.contains("show")
}

function containsGiphies() {
  return giphySection.querySelector(".giphy-block").length > 0
}

// if (giphySectionToggle) {
//   giphySectionToggle.addEventListener("click", async () => {
//     const isEnabled = toggleSection(giphySection)

//     if (isEnabled) {
//       sendButton.addEventListener("click", async () => {
//         const query = giphySearchInput.value

//         try {
//           const giphies = await getSearchedGiphies(query)

//           if (containsGiphies) return updateGiphies(giphies)

//           displayGiphies(giphies)
//         } catch (error) {
//           console.log(error)
//         }
//       })
//     }

//     const query = giphySearchInput.value || undefined

//     try {
//       let giphies
//       if (!query) {
//       } else {
//       }

//       if (containsGiphies) return updateGiphies(giphies)

//       displayGiphies(giphies)
//     } catch (error) {
//       console.log(error)
//     }
//   })
// }

// if (giphySectionToggle) {
//   giphySectionToggle.addEventListener("click", async () => {
//     try {
//       if (isEnabled) {
//         const giphies = await getTrendingGiphies()

//         displayGiphies(giphies)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   })
// }

// Account pop up
const userDeleteForm = document.querySelector(".user-delete-form")

function togglePopUp(element) {
  element.classList.toggle("pop-up--is-open")

  if (element.classList.contains("pop-up--is-open")) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.removeAttribute("style")
  }
}

if (userDeleteForm) {
  const btns = userDeleteForm.querySelectorAll(".form__button--toggle-pop-up")
  const popUpContainer = userDeleteForm.querySelector(".pop-up__container")

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", togglePopUp.bind(null, popUpContainer))
  }
}
