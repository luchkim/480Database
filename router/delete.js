const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    res.send("delete page")
})

router.get('/', (req, res)=>{
    res.send("delete page with id")
})

// export 
module.exports = router