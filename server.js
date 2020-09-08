const express = require('express')
const app =   express()
const multer = require('multer')
const cors = require('cors')
//cors middleware
app.use(cors())

//multer instance
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'null')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

//upload instance
const upload = multer({storage: storage}).single('file')

app.post('/upload', function (req, res) {
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
});