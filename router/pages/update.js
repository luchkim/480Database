const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    // res.send("Update HOME")
    res.render('../views/update.ejs', {message: "update home", where:"UPDATE"})
})


// export 
module.exports = router