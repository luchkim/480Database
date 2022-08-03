const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    res.render('../views/search.ejs', {message: "SEARCH"})
})




// export 
module.exports = router