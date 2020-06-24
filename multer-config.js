const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}.${file.originalname.split(".").pop()}`)
  },
})

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!new RegExp(/^image/).test(file.mimetype)) {
      return cb(new Error("Only images allowed"))
    }

    cb(null, true)
  },
})

module.exports = { upload, storage }
