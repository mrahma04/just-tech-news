const router = require('express').Router()
const { User } = require('../../models')

// GET /api/users
router.get('/', (req, res) => {
    // Access User model and run .findAll() method
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                // 404 is user error...something is wrong with the request that the user sent
                res.status(404).json({ message: 'No user found with this id' })
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'mbrahman', email: 'mbrahman@gmail.com', password: 'password1234'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            // error 500 indicates internal server error
            res.status(500).json(err)
        })
})

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'mbrahman', email: 'mbrahman@gmail.com', password: 'password1234'}
    // get the req.params.id

    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' })
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })

})

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' })
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router