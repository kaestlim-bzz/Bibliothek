const express = require('express')
const port = 3000
const app = express()

const authenticate = (req, res, next) => {
    const username = req.headers['username']
    const password = req.headers['password']

    if (username === 'zli' && password === 'zli1234') {
        next()
    } else {
        res.status(401).send('Unauthorized')
    }
}

app.get('/public', (req, res) => {
    res.send('Hallo')
})

app.get('/privat', authenticate, (req, res) => {
    res.send('Privater Inhalt')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
