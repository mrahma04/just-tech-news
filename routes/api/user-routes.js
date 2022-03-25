const router = require('express').Router()
const { User } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.findAll()
        res.json(dbUserData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this id found' })
            return
        }
        res.json(dbUserData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const dbNewUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.json(dbNewUser)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const dbUserData = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        // update method uses the sql UPDATE function which returns an array of 'rows affected'
        // if there's a 0 in that array, it indicates that NO ROWS were changed
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user with this id found' })
            return
        }
        res.json(dbUserData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const dbUserData = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this id found' })
            return
        }
        res.json(dbUserData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router