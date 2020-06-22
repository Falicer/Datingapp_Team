const authentication = require("./authentication")
const localVariables = require("./localVariables")
const registration = require("./registration")

module.exports = {
  ...authentication,
  ...localVariables,
  ...registration,
}
