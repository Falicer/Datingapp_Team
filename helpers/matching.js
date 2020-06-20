function getMatchingGender(sexuality, gender) {
  /*eslint indent: 0*/
  /*eslint no-unreachable: 0*/

  switch (sexuality) {
    case "heterosexual":
      return gender == "male" ? "female" : "male"
      break
    case "homosexual":
      return gender == "male" ? "male" : "female"
    default:
      return /female|male/i
      break
  }
}

module.exports = { getMatchingGender }
