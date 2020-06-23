const authentication = require("./authentication")
const localVariables = require("./localVariables")
const registration = require("./registration")
const styling = require("./styling")

module.exports = {
  ...authentication,
  ...localVariables,
  ...registration,
  ...styling,
}
