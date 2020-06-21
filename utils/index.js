const giphy = require("./giphy")
const chat = require("./chat")
const matching = require("./matching")
const userActions = require("./userActions")
const users = require("./users")

module.exports = {
  ...giphy,
  ...chat,
  ...matching,
  ...userActions,
  ...users,
}
