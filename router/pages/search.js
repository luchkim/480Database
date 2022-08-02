const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    // res.send("Search HOME")
    res.render('../views/search.ejs', {message: "search home"})
})




// export 
module.exports = router