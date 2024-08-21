const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()

app.use(session({
    secret: 'geheimnisvollesGeheimnis',
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/name', (req, res) => {
    const name = req.body.name
    req.session.name = name
    res.send('Name erfolgreich gespeichert')
})
app.get('/name', (req, res) => {
    const name = req.session.name
    res.send(`Ihr Name: ${name}`)
})

app.delete('/name', (req, res) => {
    delete req.session.name
    res.send('Name erfolgreich gelöscht')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`)
})
