import multer from "multer"


const upload = multer({dest:'uploads/',limits:{
    fieldSize: 1024 * 1024 * 10,
},})


const multerMid = upload.single("image")



module.exports = multerMid