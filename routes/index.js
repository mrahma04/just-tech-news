const router = require('express').Router()

const apiRoutes = require('./api')

router.use('/api', apiRoutes)

router.use((req, res) => {
    // if user types in /api/DOESNOTEXIST then we send a 404 back
    res.status(404).end()
})

module.exports = router