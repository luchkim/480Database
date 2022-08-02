const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    res.send("User Home page")
})

// to access this page from URL, http://localhost:3000/table/contact
router.get('/contact', (req, res)=>{
    res.send("User Phone page")
})

// export 
module.exports = router