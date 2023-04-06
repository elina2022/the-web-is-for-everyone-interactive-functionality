import express from "express"
import fs from "fs"
const app = express()
app.listen(8000)
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//logs when request is made
app.use((req, res, next) => {
    console.log("Request made on following url: " + req.url)
    next()
})

let data
let getData = pathApi => JSON.parse(fs.readFileSync('./public/api/' + pathApi + '.json').toString())

try {
    const data1 = getData("game/943")
    const data2 = getData("game/943/statistics")
    const players = getData("facts/players-extra")
    data = Object.assign({}, data1, data2, players)
    console.log(data) 
} catch (err) {
    console.error(err) 
}

//rendering pages
app.get('/', async (req, res) => {
    res.render('index', data)
})

app.use((req, res) => {
    res.status(404).render("404")
})