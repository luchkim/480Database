const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    // res.send("DELETE HOME")
    res.render('../views/delete.ejs', {message: "delete home"})
})


// export 
module.exports = router