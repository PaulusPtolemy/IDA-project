import vehicles from '../db/vehicles.json'
const { Router } = require('express')

const router = Router()

/* GET vehicle listing. */
router.get('/vehicles/', (req, res, next) => {
    vehicles.length ? res.json(vehicles) : res.sendStatus(404)
})

/* GET vehicle by ID. */
router.get('/vehicles/:id', (req, res, next) => {
    const id = req.params.id
    const item = vehicles.find(e => e.id === id)
    if (item) {
        res.json(item)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
