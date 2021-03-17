const express = require('express')
const cors = require('cors')

// Create express instance
const app = express()

app.use(cors())

// Require API routes
const vehicles = require('./routes/vehicles')

// Import API Routes
app.use(vehicles)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
    const port = process.env.PORT || 3001
    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`API server listening on port ${port}`)
    })
}
