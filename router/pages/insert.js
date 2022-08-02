const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    // res.send("insert HOME")
    res.render('../views/insert', {message: "hello from insert.js"})
})

// export 
module.exports = router