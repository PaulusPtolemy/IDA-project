import vehicles from '../db/vehicles.json'
const { Router } = require('express')

const router = Router()

/* GET vehicle listing. */
router.get('/vehicles/', function(req, res, next) {
    if (Object.keys(req.query).length) {
        const page = req.query.page ? +req.query.page : undefined
        const limit = req.query.limit ? +req.query.limit : undefined

        const idx = page === 0 ? 0 : (page * limit - 1)

        if (page >= 0 && page < vehicles.length / limit) {
            res.json(vehicles.slice(idx, idx + limit))
        } else {
            res.sendStatus(404)
        }
    } else {
        res.json(vehicles)
    }
})

/* GET vehicle by ID. */
router.get('/vehicles/:id', function(req, res, next) {
    const id = req.params.id
    const item = vehicles.find(e => e.id === id)
    if (item) {
        res.json(item)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
