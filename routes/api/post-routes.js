const router = require('express').Router()
const { Post } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll()
        res.json(dbPostData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!dbPostData) {
            res.status(404).json({ message: 'No post with this id found' })
            return
        }
        res.json(dbPostData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const dbNewPost = await Post.create({
            title: req.body.title,
            post_url: req.body.post_url,
            user_id: req.body.user_id
        })
        res.json(dbNewPost)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const dbPostData = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        // update method uses the sql UPDATE function which returns an array of 'rows affected'
        // if there's a 0 in that array, it indicates that NO ROWS were changed
        if (!dbPostData[0]) {
            res.status(404).json({ message: 'No post with this id found' })
            return
        }
        res.json(dbPostData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const dbPostData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!dbPostData) {
            res.status(404).json({ message: 'No post with this id found' })
            return
        }
        res.json(dbPostData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router