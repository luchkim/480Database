const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    res.send("Update page")
})

router.get('/:id', (req, res)=>{
    res.send("Update with id")
})

// export 
module.exports = router