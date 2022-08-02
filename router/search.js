const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    res.send("search")
})

router.get('/', (req, res)=>{
    res.send("Search page")
})

// export 
module.exports = router