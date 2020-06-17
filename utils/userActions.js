const User = require("../models/User")

const { doesNotExistInUser } = require("../utils/users")

const alreadyLiked = (currentUserId, likedUserId) =>
  doesNotExistInUser({
    _id: likedUserId,
    likesReceived: { $in: currentUserId },
  })

function likeUser(currentUserId, likedUserId) {
  return new Promise((resolve, reject) => {
    void (async function () {
      try {
        await alreadyLiked(currentUserId, likedUserId)
      } catch (error) {
        return reject("Already liked")
      }

      try {
        await User.findByIdAndUpdate(likedUserId, {
          $push: { likesReceived: currentUserId },
        })

        resolve()
      } catch (error) {
        reject(error)
      }
    })()
  })
}

module.exports = {
  likeUser,
}