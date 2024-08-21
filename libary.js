const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const port = 3000

const app = express()
app.use(session({
    secret: 'geheimnisvollesGeheimnis',
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const validUser = {
    email: 'desk@library.example',
    password: 'm295'
}

app.post('/login', (req, res) => {
    const { email, password } = req.body
    if (email === validUser.email && password === validUser.password) {
        req.session.authentication = true
        res.status(201).send('Erfolgreich eingeloggt')
    } else {
        res.status(401).send('ungültiges Passwort oder Mail')
    }
})

app.get('/verify', (req, res) => {
    if (req.session.authentication === true) {
        res.status(200).send(validUser.email)
    } else {
        res.status(401).send('nicht eingeloggt')
    }
})

app.delete('/logout', (req, res) => {
    req.session.authentication = false
    res.status(204).send('ausgelogt')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
